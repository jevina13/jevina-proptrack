import mongoose from 'mongoose';

export default mongoose.model('Client', new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  createdAt: Date
}));
