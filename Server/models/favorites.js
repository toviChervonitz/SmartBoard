const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const favoriteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    favoritePosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

module.exports = mongoose.model('Favorite', favoriteSchema);
