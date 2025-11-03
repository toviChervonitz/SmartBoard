const mongoose = require('mongoose');

async function connectMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongo connected successfully");
  } catch (err) {
    console.error(" Mongo connection failed:", err.message);
  }
}

module.exports = { connectMongo };
