const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    location: { type: String },
    category: { type: String },
    userId: { type: String, required: true },
    contactInfo: {
        phone: { type: String },
        email: { type: String },
    },
    likes: { type: Number, default: 0 },
});
postSchema.index({ title: 1 });
postSchema.index({ location: 1 });  // חדש, לחיפוש לפי עיר

module.exports = mongoose.model("Post", postSchema);