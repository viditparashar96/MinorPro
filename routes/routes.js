const express=require('express')
const router=express.Router()

const{signupController,sendOtp,loginContoller,logout}=require("../controllers/Auth")
const{addToCart,removeFromCart}=require("../controllers/Cartcontroller")
const{createProduct,getAllProducts,updateProduct ,createReview, productDetails}=require("../controllers/ProductsControllers")

const { auth, isAdmin} = require('../middleware/auth')


// Page Routes==>
// router.get('/product',function(req, res, next) {
   
//   });
  router.get('/loginpage', function(req, res, next) {
    res.render('loginpage', { title: 'Express' });
  });
  router.get('/registerpage', function(req, res, next) {
    res.render('registerpage', { title: 'Express' });
  });




router.post("/signup",signupController)
router.post("/sendotp",sendOtp)
router.post("/login",loginContoller)
router.get("/logout",auth,logout)
// Admin Routes===>
router.post("/createproduct",auth,isAdmin,createProduct)
router.patch("/updateproduct/:id",auth,isAdmin,updateProduct)
router.post("/createreview/:productId",auth,createReview)

// Customer Routes==>
router.get("/allproduct",getAllProducts)
router.post("/addtocart/:productId",auth,addToCart)
router.post("/deletefromcart/:productId",auth,removeFromCart)

router.get("/productdetails/:productId",productDetails)




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