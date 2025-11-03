// app.js
const dotenv = require('dotenv');
dotenv.config(); // חייב להיות ראשון
const authRoutes = require('./routes/authRoutes');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const postsRouter = require('./routes/postRoutes');

const HOST_NAME = process.env.HOST_NAME || '127.0.0.1';
const PORT = process.env.PORT || 3000;
const app = express({ mergeParams: true });

app.use(cors());

app.use(express.json());


app.use('/api/posts', postsRouter);
app.use('/api/auth', authRoutes);

require("./db/mongoConnection");


app.listen(PORT, HOST_NAME, () => {
    console.log('server is up and running');

})
