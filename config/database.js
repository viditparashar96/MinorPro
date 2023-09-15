const mongoose=require('mongoose')
require('dotenv').config()


exports.dbconnect=async()=>{
    try {
    
        mongoose.connect(process.env.DATABASE_URL)
        .then(()=>console.log("DB is connected"))
        .catch((err)=>{
            console.log(err)
            process.exit(1)
        })
    
    } catch (error) {
        console.log(error)
    }
}

