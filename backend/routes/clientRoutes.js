import express from 'express';
import {
  getClients,
  createClientInquiry,
  getClientById,
  updateClient
} from '../controllers/clientController.js';

const router = express.Router();

// Agent dashboard endpoints
router.get('/', getClients); // List all client inquiries
router.get('/:id', getClientById); // Get specific client details

// Public endpoint
router.post('/inquiries', createClientInquiry); // Submit inquiry form

// Agent endpoint
router.put('/:id', updateClient); // Update client info

export default router;