const express = require('express');
const router = express.Router();

const Post = require('../models/post');

// GET /api/posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
