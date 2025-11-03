
import dotenv from 'dotenv';
dotenv.config(); 

import express from 'express';
import { connectMongo } from './db/mongoConnection.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

const PORT = process.env.PORT || 3000;
const HOST_NAME = process.env.HOST_NAME || '127.0.0.1';

const app = express({ mergeParams: true });

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.use('/api/posts', postsRouter);

// Start server
app.listen(PORT, HOST_NAME, () => {
    console.log(`Server is up and running on http://${HOST_NAME}:${PORT}`);
});
