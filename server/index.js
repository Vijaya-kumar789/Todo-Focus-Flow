import express from 'express'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose';
import app from './app.js';

dotenv.config()


mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log('Connecting to the MongoDB...')
    app.listen(process.env.PORT , ()=>{console.log("server is running...")})
}).catch((error)=>{
    console.log('Error connecting to MongoDB...',error.message)
})
