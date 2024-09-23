const {Router} = require("express");
const adminRouter = Router();

adminRouter.post('/login',(req,res)=>{
    res.json({
        message:"admin login",
    })
})

adminRouter.post('/signup',(req,res)=>{
    res.json({
        message:"admin login",
    })
})


// use adminRouter.use(adminmiddlewere)

adminRouter.post('/course',(req,res)=>{
    res.json({
        message:"admin create course",
    })
})

adminRouter.put('/course',(req,res)=>{
    res.json({
        message:"admin update course",
    })
})

adminRouter.delete('/course',(req,res)=>{
    res.json({
        message:"admin delete course",
    })
})

adminRouter.get('/course/bulk',(req,res)=>{
    res.json({
        message:"admin get course",
    })
})


module.exports = adminRouter;