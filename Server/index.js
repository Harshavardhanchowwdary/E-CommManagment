require('dotenv').config();

const express = require('express');
const Mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const Path = require('path');
const {authRouter} = require('./Routes/Routes');
const app = express();
Port = process.env.PORT || 5000
app.use(express.json());
app.use(
  cors({
    origin:  "https://ecommerce-inventory-dashboard-frontend.onrender.com" , 
    credentials: true               
  })
)
app.use(cookieParser());

// dotenv.config(); 

Mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("MongoDb Connected Successfully");

    app.use('/api/Ecommanagement',authRouter)
    app.get('/',(req,res)=>{
        res.sendFile(Path.join(__dirname,'build','index.html'));
    })
    app.listen(Port,(err)=>{
        if(!err){
            console.log("Server is running on",Port);
        }else{
            console.log("Server error",err);
        }
    });
}).catch((error)=>{
    console.log("Error",error)
})
