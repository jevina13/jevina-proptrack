import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import Agent from '../models/Agent.js';
import Property from '../models/Property.js';

dotenv.config();

const images = [
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop'

];


const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');
    
    const agent = await Agent.findOne();
    if (!agent) throw new Error('❌ No agent found. Please seed agents first.');

      
    const properties = [
      {
        title: 'Modern Downtown Apartment',
        description: 'Beautiful 2-bedroom apartment in the heart of downtown with stunning city views.',
        price: 2500,
        type: 'rent',
        location: {
          address: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          coordinates: { lat: 40.7128, lng: -74.0060 }
        },
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        amenities: ['Parking', 'Gym', 'Balcony', 'Pet Friendly', 'Laundry'],
        images: [
          images[0], images[1]
        ],
        status: 'active',
        agentId: agent._id,
        createdAt: new Date('2024-01-15T10:00:00Z'),
        updatedAt: new Date('2024-01-15T10:00:00Z')
      },
      {
        title: 'Coastal Beach House',
        description: 'Charming 3-bedroom beach house with ocean views and direct beach access.',
        price: 4500,
        type: 'rent',
        location: {
          address: '789 Ocean Drive',
          city: 'Miami',
          state: 'FL',
          zipCode: '33139',
          coordinates: { lat: 25.7617, lng: -80.1918 }
        },
        bedrooms: 3,
        bathrooms: 2,
        area: 1800,
        amenities: ['Parking', 'Pool', 'Balcony', 'Pet Friendly'],
        images: [images[0], images[1]],
        status: 'active',
        agentId: agent._id,
        createdAt: new Date('2024-02-01T11:00:00Z'),
        updatedAt: new Date('2024-02-01T11:00:00Z')
      },
      {
        title: 'Suburban Family Home',
        description: 'Spacious 4-bedroom home with large backyard, perfect for a growing family.',
        price: 550000,
        type: 'sale',
        location: {
          address: '456 Maple Ave',
          city: 'Chicago',
          state: 'IL',
          zipCode: '60614',
          coordinates: { lat: 41.8781, lng: -87.6298 }
        },
        bedrooms: 4,
        bathrooms: 3,
        area: 2500,
        amenities: ['Garage', 'Garden', 'Fireplace'],
        images: [images[0], images[1]],
        status: 'active',
        agentId: agent._id,
        createdAt: new Date('2024-03-01T14:00:00Z'),
        updatedAt: new Date('2024-03-01T14:00:00Z')
      },
      {
        title: 'Luxury Penthouse',
        description: 'Modern 2-bedroom penthouse with rooftop terrace and city skyline views.',
        price: 1200000,
        type: 'sale',
        location: {
          address: '101 Highrise Blvd',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94103',
          coordinates: { lat: 37.7749, lng: -122.4194 }
        },
        bedrooms: 2,
        bathrooms: 2,
        area: 1400,
        amenities: ['Rooftop Deck', 'Gym', 'Concierge', 'Parking'],
        images: [images[0], images[1]],
        status: 'active',
        agentId: agent._id,
        createdAt: new Date('2024-04-10T09:30:00Z'),
        updatedAt: new Date('2024-04-10T09:30:00Z')
      },
      {
        title: 'Downtown Loft',
        description: 'Open-concept loft with exposed brick and high ceilings in the heart of downtown.',
        price: 2200,
        type: 'rent',
        location: {
          address: '202 Main St',
          city: 'Austin',
          state: 'TX',
          zipCode: '78701',
          coordinates: { lat: 30.2672, lng: -97.7431 }
        },
        bedrooms: 1,
        bathrooms: 1,
        area: 900,
        amenities: ['Parking', 'Pet Friendly', 'Laundry'],
        images: [images[0], images[1]],
        status: 'active',
        agentId: agent._id,
        createdAt: new Date('2024-05-05T12:15:00Z'),
        updatedAt: new Date('2024-05-05T12:15:00Z')
      },
      {
        title: 'Modern Townhouse',
        description: 'Contemporary 3-bedroom townhouse with private garden and garage.',
        price: 3500,
        type: 'rent',
        location: {
          address: '303 Elm St',
          city: 'Seattle',
          state: 'WA',
          zipCode: '98101',
          coordinates: { lat: 47.6062, lng: -122.3321 }
        },
        bedrooms: 3,
        bathrooms: 2,
        area: 1600,
        amenities: ['Garage', 'Garden', 'Balcony', 'Pet Friendly'],
        images: [images[0], images[1]],
        status: 'active',
        agentId: agent._id,
        createdAt: new Date('2024-06-12T15:45:00Z'),
        updatedAt: new Date('2024-06-12T15:45:00Z')
      },
      {
        title: 'Rustic Cabin',
        description: 'Cozy 2-bedroom cabin in the mountains, surrounded by nature.',
        price: 1800,
        type: 'rent',
        location: {
          address: '404 Pine Rd',
          city: 'Denver',
          state: 'CO',
          zipCode: '80202',
          coordinates: { lat: 39.7392, lng: -104.9903 }
        },
        bedrooms: 2,
        bathrooms: 1,
        area: 1100,
        amenities: ['Fireplace', 'Garden', 'Pet Friendly'],
        images: [images[0], images[1]],
        status: 'active',
        agentId: agent._id,
        createdAt: new Date('2024-07-01T08:45:00Z'),
        updatedAt: new Date('2024-07-01T08:45:00Z')
      },
      {
        title: 'Urban Studio',
        description: 'Compact and stylish studio apartment ideal for young professionals.',
        price: 1500,
        type: 'rent',
        location: {
          address: '505 City Center',
          city: 'Boston',
          state: 'MA',
          zipCode: '02108',
          coordinates: { lat: 42.3601, lng: -71.0589 }
        },
        bedrooms: 0,
        bathrooms: 1,
        area: 600,
        amenities: ['Gym', 'Laundry', 'Concierge'],
        images: [images[0], images[1]],
        status: 'active',
        agentId: agent._id,
        createdAt: new Date('2024-08-10T13:20:00Z'),
        updatedAt: new Date('2024-08-10T13:20:00Z')
      },
      {
        title: 'Historic Mansion',
        description: 'Grand 6-bedroom historic mansion with timeless architecture.',
        price: 2500000,
        type: 'sale',
        location: {
          address: '606 Heritage Ln',
          city: 'Savannah',
          state: 'GA',
          zipCode: '31401',
          coordinates: { lat: 32.0809, lng: -81.0912 }
        },
        bedrooms: 6,
        bathrooms: 5,
        area: 5000,
        amenities: ['Garden', 'Fireplace', 'Garage', 'Pool'],
        images: [images[0], images[1]],
        status: 'active',
        agentId: agent._id,
        createdAt: new Date('2024-09-15T10:00:00Z'),
        updatedAt: new Date('2024-09-15T10:00:00Z')
      },
      {
        title: 'Countryside Villa',
        description: 'Elegant 4-bedroom villa in the countryside with vast green lawns.',
        price: 850000,
        type: 'sale',
        location: {
          address: '707 Countryside Rd',
          city: 'Nashville',
          state: 'TN',
          zipCode: '37201',
          coordinates: { lat: 36.1627, lng: -86.7816 }
        },
        bedrooms: 4,
        bathrooms: 3,
        area: 3200,
        amenities: ['Garage', 'Garden', 'Fireplace', 'Balcony'],
        images: [images[0], images[1]],
        status: 'active',
        agentId: agent._id,
        createdAt: new Date('2024-10-05T09:00:00Z'),
        updatedAt: new Date('2024-10-05T09:00:00Z')
      },
      {
        title: 'Modern Lakehouse',
        description: 'Stunning 3-bedroom lakehouse with panoramic water views and private dock.',
        price: 650000,
        type: 'sale',
        location: {
          address: '808 Lakeview Dr',
          city: 'Minneapolis',
          state: 'MN',
          zipCode: '55401',
          coordinates: { lat: 44.9778, lng: -93.2650 }
        },
        bedrooms: 3,
        bathrooms: 2,
        area: 2200,
        amenities: ['Garage', 'Balcony', 'Fireplace', 'Waterfront'],
        images: [images[0], images[1]],
        status: 'active',
        agentId: agent._id,
        createdAt: new Date('2024-11-01T11:30:00Z'),
        updatedAt: new Date('2024-11-01T11:30:00Z')
      }  
    ];
    
    await Property.deleteMany({});
    console.log('🗑️ Existing properties removed');

    await Property.insertMany(properties);
    console.log('🌱 Properties inserted successfully');

    process.exit();
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
};

seed();
