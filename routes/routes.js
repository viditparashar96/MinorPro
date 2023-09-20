const express=require('express')
const router=express.Router()

const{signupController,sendOtp,loginContoller,logout}=require("../controllers/Auth")
const{addToCart,removeFromCart}=require("../controllers/Cartcontroller")
const{createProduct,getAllProducts,updateProduct ,createReview}=require("../controllers/ProductsControllers")

const { auth, isAdmin} = require('../middleware/auth')

router.post("/signup",signupController)
router.post("/sendotp",sendOtp)
router.post("/login",loginContoller)
router.post("/logout",auth,logout)
// Admin Routes===>
router.post("/createproduct",auth,isAdmin,createProduct)
router.patch("/updateproduct/:id",auth,isAdmin,updateProduct)
router.post("/createreview/:productId",auth,createReview)

// Customer Routes==>
router.post("/addtocart/:productId",auth,addToCart)
router.post("/deletefromcart/:productId",auth,removeFromCart)






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