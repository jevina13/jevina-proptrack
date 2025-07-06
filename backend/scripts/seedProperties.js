import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
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

const properties = [
  {
    title: 'Modern Apartment in Downtown',
    description: 'Beautiful apartment with city view.',
    price: 200000,
    type: 'sale',
    location: {
      address: '123 Main St',
      city: 'Metropolis',
      state: 'NY',
      zipCode: '10001',
      coordinates: { lat: 40.7128, lng: -74.006 }
    },
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    amenities: ['balcony', 'gym', 'pool'],
    images: [images[0], images[1]],
    isActive: true,
  },
  {
    title: 'Cozy House in Suburbs',
    description: 'Spacious house with garden.',
    price: 350000,
    type: 'sale',
    location: {
      address: '456 Elm St',
      city: 'Smallville',
      state: 'KS',
      zipCode: '66002',
      coordinates: { lat: 39.0097, lng: -94.6985 }
    },
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    amenities: ['garden', 'garage', 'fireplace'],
    images: [images[2],images[3]],
    isActive: true,
  },
  {
    title: 'Luxury Condo with Ocean View',
    description: 'Exclusive condo by the beach.',
    price: 750000,
    type: 'sale',
    location: {
      address: '789 Ocean Dr',
      city: 'Coastal City',
      state: 'CA',
      zipCode: '90210',
      coordinates: { lat: 34.0522, lng: -118.2437 }
    },
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    amenities: ['ocean view', 'security', 'parking'],
    images: [images[4],images[5]],
    isActive: true,
  }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

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
