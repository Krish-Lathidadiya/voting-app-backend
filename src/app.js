require('dotenv').config();
const express=require('express');

const app = express();
//other middleware
app.use(express.json())
//Define routes

//error handling middleware
module.exports=app;