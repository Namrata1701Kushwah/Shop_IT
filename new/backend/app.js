const express = require("express");
const app = express();
const cookieParser=require('cookie-parser');
const bodyparser = require('body-parser');
const fileUpload = require('express-fileupload')
// const cloudinary = require ('cloudinary')
const errorMiddleware=require('./middlewares/errors')
const products = require("./routes/product");
const auth=require('./routes/auth')
const payment=require('./routes/payment')
const order=require('./routes/order')
const dotenv = require("dotenv");



dotenv.config({ path: "./config/config.env" });

// console.log("test",test);
app.use(bodyparser.urlencoded({ extended : true}));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload())

//Seting up cloudinary config
// cloudinary.config({
//     cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
//     api_key : process.env.CLOUDINARY_API_KEY,
//     api_secret : process.env.CLOUDINARY_API_SECRET
// })



//Import all route
app.use("/api/v1", products);
app.use('/api/v1',auth);
app.use('/api/v1',payment);
app.use('/api/v1',order)
app.use(errorMiddleware)
module.exports = app;
