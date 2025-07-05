import Property from '../models/Property.js';
import { buildFilterQuery, paginateResults } from '../utils/paginate.js';

// Get paginated & filtered properties (Public)
export const getProperties = async (req, res) => {
  try {
    const { page = 1, limit = 10, ...filters } = req.query;
    const query = buildFilterQuery(filters);
    
    const properties = await Property.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Property.countDocuments(query);
    const pagination = paginateResults(page, limit, total);

    res.json({ properties, pagination });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single property details (Public)
export const getPropertyById = async (req, res) => {
    try {
      const { id } = req.params;
      
      const property = await Property.findOne({ 
        _id: id, 
        isActive: true 
      }).populate({
        path: 'inquiries',
        select: 'name email phone'
      });
  
      if (!property) {
        return res.status(404).json({ message: 'Property not found or not active' });
      }
  
      res.json(property);
    } catch (error) {
      res.status(500).json({ 
        message: 'Server error',
        error: error.message 
      });
    }
  };

// Create property (Agent)
export const createProperty = async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

// Update property (Agent)
export const updateProperty = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
  
      // Prevent isActive modification via this endpoint
      if ('isActive' in updates) {
        return res.status(400).json({ 
          message: 'Use archive endpoint to modify active status' 
        });
      }
  
      const updatedProperty = await Property.findByIdAndUpdate(
        id,
        updates,
        { 
          new: true, // Return updated document
          runValidators: true // Run schema validations
        }
      );
  
      if (!updatedProperty) {
        return res.status(404).json({ message: 'Property not found' });
      }
  
      res.json({
        message: 'Property updated successfully',
        property: updatedProperty
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ 
          message: 'Validation error',
          errors: error.errors 
        });
      }
      res.status(500).json({ 
        message: 'Server error',
        error: error.message 
      });
    }
  };

// Archive/delete property (Agent)
export const archiveProperty = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Soft delete by setting isActive to false
      const archivedProperty = await Property.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true } // Return the updated document
      );
  
      if (!archivedProperty) {
        return res.status(404).json({ message: 'Property not found' });
      }
  
      res.json({ 
        message: 'Property archived successfully',
        property: archivedProperty 
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Server error',
        error: error.message 
      });
    }
  };