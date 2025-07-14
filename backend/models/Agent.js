import mongoose from 'mongoose';

export default mongoose.model('Agent', new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
}));
