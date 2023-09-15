const User=require('../models/User')
const jwt=require('jsonwebtoken')
require('dotenv').config()

exports.auth=async (req,res,next)=>{
    try {
        const token=req.cookies.token
        if(!token){
            return res.status(401).json({
                success:false,
                msg:"Token not found"
            })
        }
        try {
            const decode=jwt.verify(token,process.env.JWT_SECRECT)
          
            req.user=decode
        } catch (error) {
            console.log(error)
        }
       next()
    } catch (error) {
        console.log(error)
    }
}

exports.isAdmin=async(req,res,next)=>{
    try {
        
        console.log(req.user)
        if(req.user.role!=="Admin"){
            return res.status(401).json({
                success:false,
                msg:"You Do not have the permision to visit this route"
            })
        }
        next()
    } catch (error) {
        console.log(error)

    }
}