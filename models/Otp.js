const mongoose=require('mongoose')
const { mailSender } = require('../utils/mailSender')


const otpSchema=new mongoose.Schema({
    email:{
        type:String,
       
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60*1000
    }
})

async function sendVerificationMail(email,otp){
    try {
        const mailResponse=await mailSender(email,"Verification Email for singnup",otp)
        console.log(mailResponse)
        return mailResponse
        
    } catch (error) {
        console.log("error occured while sending mail",error)
        throw error
    }
}

otpSchema.pre("save",async function(next){
    await sendVerificationMail(this.email,this.otp)
    next()
})







module.exports=mongoose.model("otps",otpSchema)