import mongoose from 'mongoose';

const viewingSchema = new mongoose.Schema(
  {
    propertyId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Property', 
      required: true 
    },
    clientId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Client', 
      required: true 
    },
    agentId: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Agent'
  },
  scheduledDate: { type: Date, required: true },
    
    status: { 
      type: String, 
      enum: ['scheduled', 'completed', 'no-show'], 
      default: 'scheduled' 
    },
    notes: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
);

export default mongoose.model('Viewing', viewingSchema);