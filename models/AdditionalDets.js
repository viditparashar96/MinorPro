const mongoose=require('mongoose')

const additionalDetsSchema=new mongoose.Schema({
    state:{
        type:String,
       
    },
    city:{
        type:String,
       
    },
    pincode:{
        type:String,
        
    },
    address:{
        type:String,
        
    },
    landMark:{
        type:String,

    }

})

module.exports=mongoose.model("AdditionalDets",additionalDetsSchema)