import mongoose from 'mongoose';

export default mongoose.model('Inquiry', new mongoose.Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  message: String,
  status: String,
  createdAt: Date
}));
