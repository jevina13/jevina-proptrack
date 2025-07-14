import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Agent from '../models/Agents.js';

dotenv.config();

const agents = [
  {
    name: 'Alex Thompson',
    email: 'alex.thompson@proptrack.com',
    phone: '+1 (555) 234-5678'
  }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    await Agent.deleteMany({});
    console.log('🗑️ Existing agents removed');

    await Agent.insertMany(agents);
    console.log('🌱 Agents inserted successfully',agents  );

    process.exit();
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
};

seed();
