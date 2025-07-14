import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const resetDB = async () => {
  try {
    if (!MONGO_URI) throw new Error('MONGO_URI not defined in .env');

    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const collections = await mongoose.connection.db.listCollections().toArray();

    if (!collections.length) {
      console.log('⚠️  No collections found.');
    }

    for (const collection of collections) {
      console.log(`🗑 Dropping collection: ${collection.name}`);
      await mongoose.connection.db.dropCollection(collection.name);
    }

    console.log('🎉 All collections dropped successfully.');
  } catch (err) {
    console.error('❌ Error resetting database:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

resetDB();
