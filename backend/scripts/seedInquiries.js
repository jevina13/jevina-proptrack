import mongoose from 'mongoose';
import Property from '../models/Property.js';
import Client from '../models/Client.js';
import Inquiry from '../models/Inquiry.js';
import dotenv from 'dotenv';

dotenv.config();


await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

console.log('✅ Connected to MongoDB');

const properties = await Property.find();
const clients = await Client.find();

await Inquiry.deleteMany({});

const inquiries = await Inquiry.insertMany([
    {
      message: 'I am interested in scheduling a viewing for this apartment.',
      status: 'new',
      propertyId: properties[0]._id,
      clientId: clients[0]._id,
      createdAt: new Date('2024-02-05T14:20:00Z')
    },
    {
      message: 'Could you provide more information about the neighborhood and schools nearby?',
      status: 'contacted',
      propertyId: properties[1]._id,
      clientId: clients[1]._id,
      createdAt: new Date('2024-02-03T16:45:00Z')
    }
  ]);

console.log('✅ Inquiries seeded:', inquiries);
