const User=require("../models/User")
const bcrypt=require("bcryptjs")
const OTP=require('../models/Otp')
const AdditionalDets = require("../models/AdditionalDets")
const jwt=require('jsonwebtoken')
require('dotenv').config()



exports.sendOtp=async (req,res)=>{
    try {
        const {email}=req.body
        const checkUserPresent=await User.findOne({email})
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                msg:"User already exisit"
            })
        }
        // Generate otp
        var otp = Math.floor(1000 + Math.random() * 9000);
        const createdOtp=await OTP.create({
            email,
            otp
        })
        console.log(createdOtp)
        return res.status(200).json({
            success:true,
            msg:"OTP sent Successfully"
        })
    } catch (error) {
        
    }
}




exports.signupController=async(req,res)=>{
    try {
        
        const {name,email,phoneNumber,password,confirmPassword,role,otp}=req.body
        console.log(name,email,otp)
    if(!name || !email || !phoneNumber || !password || !confirmPassword || !role){
        return res.status(403).json({
            success:false,
            msg:"Fill up the Blank area"
        })
    }
    if(password!==confirmPassword){
        return res.status(403).json({
            success:false,
            msg:"Password not Matched"
        })
    }
    const existingUser=await User.findOne({email})

    if(existingUser){
        return res.status(400).json({
            success:false,
            msg:"User is already register"
        })
    }
    const recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1)
    console.log("recentOtp===>",recentOtp)
    if(recentOtp.length==0){
        return res.status(400).json({
            success:false,
            msg:"OTP NOT FOUND"
        })
    }
    if(otp!==recentOtp[0].otp){
        return res.status(400).json({
            success:false,
            msg:"OTP is not Valid"
        })
    }
    if(recentOtp.createdAt<Date.now()){
        return res.status(400).json({
            success:false,
            msg:"OTP is not Valid time"
        })
    }

    const hashedPassword=await bcrypt.hash(password,10)

    const additionalDets=await AdditionalDets.create({
        state:null,
        city:null,
        pincode:null,
        address:null,
        landMark:null
    })

    const user=await User.create({
        name,
        email,
        password:hashedPassword,
        role,
        phoneNumber,
        additionalDetails:additionalDets._id,
    })

    return res.status(200).json({
        success:true,
        msg:"User is registered successfully",
        user
    })



    } catch (error) {
        console.log(error)
    }



}

exports.loginContoller=async (req,res)=>{

   try {
    const {email,password}=req.body
    console.log(email,password)
    // Check if user is exist or not
    const user= await User.findOne({email})

    if(!user){
        return res.status(401).json({
            success:false,
            msg:"Signup first"
        })

    }
    // compare password
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(401).json({
            success:false,
            msg:"Wrong credentials"
        })
    }
    const payload={
        id:user._id,
        name:user.name,
        role:user.role,
        email:user.email
    }
    const token=jwt.sign(payload,process.env.JWT_SECRECT,{expiresIn:"2d"})
    user.token=token
    user.password=undefined

    res.cookie("token",token,{
        httpOnly:true,
        expires:new Date(Date.now() + 3*24*60*60*1000)
    }).status(200).json({
        success:true,
        token,
        user,
        msg:"Logged in successful"
    })
   } catch (error) {
    console.log(error)
   }


}

exports.logout = async (req, res) => {
    try {
        res.cookie("token","",{
            httpOnly:true,
            expires:new Date(Date.now())
        }).status(200).json({
            success:true,
            msg:"Logged Out "
        })
    } catch (error) {
        console.log(error)
    }
   
 };
 