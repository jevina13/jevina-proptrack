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
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { 
      type: String, 
      enum: ['scheduled', 'completed', 'no-show'], 
      default: 'scheduled' 
    },
    notes: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('Viewing', viewingSchema);