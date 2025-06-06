const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("MongoDB connecting....");

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
