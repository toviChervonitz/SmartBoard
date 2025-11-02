const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  location: { type: String },
  contactInfo: {
    phone: { type: String },
    email: { type: String },
  },
  likes: { type: Number, default: 0 },
});

module.exports = mongoose.model("Post", postSchema);
