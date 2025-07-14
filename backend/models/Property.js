import mongoose from 'mongoose';


export default mongoose.model('Property', new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  type: String,
  location: {
    address: String,
    city: String,
    state: String,
    zipCode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  bedrooms: Number,
  bathrooms: Number,
  area: Number,
  amenities: [String],
  images: [String],
  status: String,
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  createdAt: Date,
  updatedAt: Date
}));
