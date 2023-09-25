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
const logger=require("morgan")
const path=require('path')
const publicPath=path.join(__dirname,"./public")
dbconnect()

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
connectcloudinary()
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use(logger("tiny"))
app.use(cookie())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(publicPath))
app.use(route)


app.get('/', function(req, res, next) {
  var loggedIn=false
  if(req.cookies.token){
    loggedIn=true
  }
    res.render('index', { loggedIn });
  });

app.listen(PORT,()=>console.log(`server has started on port ${PORT}`))