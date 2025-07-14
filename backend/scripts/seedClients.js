import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Client from '../models/Client.js';

dotenv.config();

const clients = [
  {
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    createdAt: new Date('2024-01-10T08:00:00Z')
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 987-6543',
    createdAt: new Date('2024-01-15T10:30:00Z')
  }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    await Client.deleteMany({});
    console.log('🗑️ Existing clients removed');

    await Client.insertMany(clients);
    console.log('🌱 Clients inserted successfully',clients);

    process.exit();
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
};

seed();
