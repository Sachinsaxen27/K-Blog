const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://sachinsaxenapec:sachin23@sessionbooking.j37ge8m.mongodb.net/?retryWrites=true&w=majority&appName=k-blog';

const connectToMongo = async () => {
  try {
    if (!mongoURI) {
      throw new Error("MongoDB URI is missing. Check your .env.development file.");
    }

    await mongoose.connect(mongoURI);
    console.log("✅ Successfully connected to K-Blog MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectToMongo;
