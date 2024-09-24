const {Router} = require("express");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const {adminModel,courseModel} = require("../db");
const adminSecret = process.env.JWT_ADMIN_SECRET;


const adminRouter = Router();

adminRouter.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    const admin = await adminModel.findOne({email,password});

    if(!admin){
        res.status(403).json({
            message : "Incorrect credentials",
        })
    }else{

        // cookie based auth in future
            const adminToken = jwt.sign({
                id:admin._id.toString(),
            },adminSecret);
            res.json({
                adminToken,
                message:"admin login",
            })
    }
})

adminRouter.post('/signup',async (req,res)=>{
   try {
    const {email,password,firstName,lastName} = req.body;
    
    await adminModel.create({
        email,password,firstName,lastName
    })
    res.json({
        message:"admin login",
    })
   } catch (error) {
    res.status(403).json({
        message:"validation error",
    })
   }
})

function adminAuthMiddlewere(req,res,next){
  const adminToken = req.headers.authorization;
  const response = jwt.verify(adminToken,adminSecret);
  
  if(response){
        req.userId = response.id;
        next();
  }else{
    res.status(403).json({
        message :"not authorized",
    })
  }
}

adminRouter.post('/course',adminAuthMiddlewere,(req,res)=>{
    res.json({
        message:"admin create course",
    })
})

adminRouter.put('/course',adminAuthMiddlewere,(req,res)=>{
    res.json({
        message:"admin update course",
    })
})

adminRouter.delete('/course',adminAuthMiddlewere,(req,res)=>{
    res.json({
        message:"admin delete course",
    })
})

adminRouter.get('/course/bulk',adminAuthMiddlewere,(req,res)=>{
    res.json({
        message:"admin get course",
    })
})


module.exports = adminRouter;