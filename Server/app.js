
import dotenv from 'dotenv';
dotenv.config(); 

import express from 'express';
import { connectMongo } from './db/mongoConnection.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

const PORT = process.env.PORT || 3000;
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