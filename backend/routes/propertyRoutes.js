import express from 'express';
import {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  archiveProperty
} from '../controllers/propertyController.js';

const router = express.Router();

// Public routes
router.get('/', getProperties);
router.get('/:id', getPropertyById);

// Agent routes
router.post('/', createProperty);
router.put('/:id', updateProperty);
router.delete('/:id', archiveProperty);

export default router;