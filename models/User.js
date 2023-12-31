const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    }, 
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Orders"
        }
    ],
    cart:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Products"
        }
    ],
    totalCartBill:{
        type:Number,
        default:0
    },
    wishList:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Products"
        }
    ],  
    role:{
        type:String,
        enum:["Admin","Customer"]
    },
    token:{
        type:String,
        expires:5*60*1000
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"AdditionalDets"
    }
})

module.exports=mongoose.model("User",userSchema)