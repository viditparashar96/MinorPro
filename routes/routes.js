const express=require('express')
const router=express.Router()

const{signupController,sendOtp,loginContoller,logout}=require("../controllers/Auth")
const { auth, isAdmin } = require('../middleware/auth')

router.post("/signup",signupController)
router.post("/sendotp",sendOtp)
router.post("/login",loginContoller)
router.post("/logout",auth,logout)
router.get("/dummyauth",auth,isAdmin,(req,res)=>{
    try {
        res.status(200).json({
            sucess:true,
            msg:req.user.name
        })
    } catch (error) {
        console.log(error)
    }
  
})







module.exports=router