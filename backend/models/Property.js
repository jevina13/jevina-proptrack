import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, index: true },
  type: { type: String, enum: ['rent', 'sale'], required: true },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  amenities: [{ type: String }],
  images: [{ type: String }],
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  area: { type: Number, required: true },
  isActive: { type: Boolean, default: true, index: true }
}, { timestamps: true });


// Indexes for filtering
propertySchema.index({ price: 1, location: 1, type: 1, bedrooms: 1, bathrooms: 1, area: 1 });

export default mongoose.model('Property', propertySchema);