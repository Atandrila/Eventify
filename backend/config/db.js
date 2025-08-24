const mongoose = require('mongoose');

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI is not set');
    throw new Error('MONGODB_URI env not set');
  }

  try {
    const conn = await mongoose.connect(uri, {
      // modern mongoose doesn’t need many opts; kept minimal
      dbName: process.env.MONGO_DB_NAME  undefined,
    });
    isConnected = true;
    console.log('✅ MongoDB connected:', conn.connection.host);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    throw err;
  }
}

module.exports = connectDB;