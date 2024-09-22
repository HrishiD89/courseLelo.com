const express =  require("express");
require('dotenv').config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

app.post("/user/login",(req,res)=>{
    res.json({
        message:"login endpoint",
    })
});
app.post("user/signup",(req,res)=>{
    res.json({
        message:"signup endpoint",
    })
});

app.get("/user/purchases",(req,res)=>{
    res.json({
        message:"my courses",
    })
});  //my course


app.post("/course/purchases",(req,res)=>{
    res.json({
        message:"puchase course",
    })
});  //my course


app.get("/courses",(req,res)=>{
    res.json({
        message:"get all courses",
    })
});



app.listen(3000,()=>{
    console.log(`Server is listening to PORT : 3000`);
});