// app.js
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const postsRouter = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');

const HOST_NAME = process.env.HOST_NAME || '127.0.0.1';
const PORT = process.env.PORT || 3000;
const app = express({ mergeParams: true });

app.use(cors());

app.use(express.json());


app.use('/api/posts', postsRouter);
app.use('/api/auth', authRoutes);

const { connectMongo } = require('./db/mongoConnection');

connectMongo();

app.listen(PORT, HOST_NAME, () => {
  console.log('Server is up and running');
});