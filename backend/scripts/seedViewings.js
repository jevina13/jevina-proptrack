import mongoose from 'mongoose';
import Property from '../models/Property.js';
import Client from '../models/Client.js';
import Agent from '../models/Agent.js';
import Viewing from '../models/Viewing.js';
import dotenv from 'dotenv';

dotenv.config();


await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

console.log('✅ Connected to MongoDB');

const agent = await Agent.findOne();
const properties = await Property.find();
const clients = await Client.find();

await Viewing.deleteMany({});

const viewings = await Viewing.insertMany([
  {
    status: 'scheduled',
    scheduledDate: new Date('2024-02-10T15:00:00Z'),
    propertyId: properties[0]._id,
    clientId: clients[0]._id,
    agentId: agent._id,
    createdAt: new Date('2024-02-05T14:25:00Z')
  },
  {
    status: 'completed',
    notes: 'Client was very interested, considering making an offer.',
    scheduledDate: new Date('2024-02-08T10:30:00Z'),
    propertyId: properties[1]._id,
    clientId: clients[1]._id,
    agentId: agent._id,
    createdAt: new Date('2024-02-03T17:00:00Z')
  }
]);

console.log('✅ Viewings seeded:', viewings);

await mongoose.disconnect();
