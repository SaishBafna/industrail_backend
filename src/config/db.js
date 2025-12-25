// backend/config/db.js
import { connect } from "mongoose";
import mongoose from "mongoose";
const connectDB = async () => {
  try {
    console.log("Trying to connect:", process.env.MONGO_URI);

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB connected:", conn.connection.host);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
