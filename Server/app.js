const express = require('express');



require('dotenv').config();


const HOST_NAME = process.env.HOST_NAME | '127.0.0.1';
const PORT = process.env.PORT | 3000;
const app = express({ mergeParams: true });


app.use(express.json());



require("./db/mongoConnection");


app.listen(PORT, HOST_NAME, () => {
    console.log('server is up and running');

})
