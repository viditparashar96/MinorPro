require('dotenv').config()
const express=require('express')
const app=express()
const PORT=process.env.PORT || 4000
const {dbconnect}=require("./config/database")
const route=require('./routes/routes')
const bodyParser=require('body-parser')
const cookie=require('cookie-parser')
const  {connectcloudinary}=require('./config/cloudinary')
const fileUpload=require('express-fileupload')
dbconnect()
connectcloudinary()
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use(cookie())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(route)


app.get("/",(req,res)=>{
    res.send("Home page")
})

app.listen(PORT,()=>console.log(`server has started on port ${PORT}`))