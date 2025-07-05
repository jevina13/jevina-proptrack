import Client from '../models/Client.js';
import Property from '../models/Property.js';

// Get all client inquiries (Agent)
export const getClients = async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const clients = await Client.find(query)
      .populate({
        path: 'inquiries',
        select: 'title price type'
      })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Client.countDocuments(query);

    res.json({
      clients,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to fetch clients',
      error: error.message 
    });
  }
};

// Create client inquiry (Public)
export const createClientInquiry = async (req, res) => {
  try {
    const { propertyId, ...clientData } = req.body;
    
    // Validate property exists
    const property = await Property.findById(propertyId);
    if (!property || !property.isActive) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Create or update client
    let client = await Client.findOne({ email: clientData.email });
    if (!client) {
      client = new Client(clientData);
    } else {
      client.set(clientData);
    }

    // Add inquiry if not already exists
    if (!client.inquiries.includes(propertyId)) {
      client.inquiries.push(propertyId);
    }

    await client.save();

    res.status(201).json({
      message: 'Inquiry submitted successfully',
      client: {
        _id: client._id,
        name: client.name,
        email: client.email
      }
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({ 
      message: 'Failed to create inquiry',
      error: error.message 
    });
  }
};

// Get client details (Agent)
export const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id)
      .populate({
        path: 'inquiries',
        select: 'title price type location'
      })
      .populate({
        path: 'viewings',
        select: 'date time status propertyId',
        populate: {
          path: 'propertyId',
          select: 'title location'
        }
      });

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json(client);
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to fetch client',
      error: error.message 
    });
  }
};

// Update client info (Agent)
export const updateClient = async (req, res) => {
  try {
    const updates = req.body;
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json({
      message: 'Client updated successfully',
      client
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({ 
      message: 'Failed to update client',
      error: error.message 
    });
  }
};