import express from 'express';
import {
  scheduleViewing,
  updateViewingStatus,
  getViewingsByProperty,
  getViewingsByClient
} from '../controllers/viewingController.js';

const router = express.Router();

// Agent dashboard endpoints
router.post('/', scheduleViewing); // Schedule new viewing
router.patch('/:id', updateViewingStatus); // Update viewing status/notes

// Optional endpoints
router.get('/property/:propertyId', getViewingsByProperty); // Get viewings for property
router.get('/client/:clientId', getViewingsByClient); // Get viewings for client

export default router;