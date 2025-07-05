import Viewing from '../models/Viewing.js';
import Client from '../models/Client.js';
import Property from '../models/Property.js';

// Schedule new viewing (Agent)
export const scheduleViewing = async (req, res) => {
  try {
    const { propertyId, clientId, date, time } = req.body;

    // Validate property and client exist
    const [property, client] = await Promise.all([
      Property.findById(propertyId),
      Client.findById(clientId)
    ]);

    if (!property || !property.isActive) {
      return res.status(404).json({ message: 'Property not found' });
    }
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Check for existing viewing at same time
    const existingViewing = await Viewing.findOne({
      propertyId,
      date,
      time,
      status: 'scheduled'
    });

    if (existingViewing) {
      return res.status(409).json({ 
        message: 'Viewing already scheduled for this time slot' 
      });
    }

    const viewing = new Viewing({
      propertyId,
      clientId,
      date,
      time,
      status: 'scheduled'
    });

    await viewing.save();

    // Add to client's viewings array
    client.viewings.push(viewing._id);
    await client.save();

    res.status(201).json({
      message: 'Viewing scheduled successfully',
      viewing
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({ 
      message: 'Failed to schedule viewing',
      error: error.message 
    });
  }
};

// Update viewing status (Agent)
export const updateViewingStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const allowedStatuses = ['scheduled', 'completed', 'no-show'];

    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({ 
        message: 'Invalid status value' 
      });
    }

    const viewing = await Viewing.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true, runValidators: true }
    )
    .populate('propertyId', 'title location')
    .populate('clientId', 'name email');

    if (!viewing) {
      return res.status(404).json({ message: 'Viewing not found' });
    }

    res.json({
      message: 'Viewing updated successfully',
      viewing
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({ 
      message: 'Failed to update viewing',
      error: error.message 
    });
  }
};

// Get viewings by property (Agent)
export const getViewingsByProperty = async (req, res) => {
  try {
    const viewings = await Viewing.find({ 
      propertyId: req.params.propertyId 
    })
    .populate('clientId', 'name email phone')
    .sort({ date: 1, time: 1 });

    res.json(viewings);
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to fetch viewings',
      error: error.message 
    });
  }
};

// Get viewings by client (Agent)
export const getViewingsByClient = async (req, res) => {
  try {
    const viewings = await Viewing.find({ 
      clientId: req.params.clientId 
    })
    .populate('propertyId', 'title price type location')
    .sort({ date: -1 });

    res.json(viewings);
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to fetch viewings',
      error: error.message 
    });
  }
};