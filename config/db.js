const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI,);
    console.log('MongoDB Connected successfully');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;