// Config/dbConnection.js
import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("❌ MONGODB_URI is not set");
    throw new Error("MONGODB_URI env not set");
  }

  try {
    const conn = await mongoose.connect(uri, {
      dbName: process.env.MONGO_DB_NAME || undefined,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("✅ MongoDB connected:", conn.connection.host);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    throw err;
  }
};

export default connectDB;
