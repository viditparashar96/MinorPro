const Products = require("../models/Products");
const User=require("../models/User")
const Cart=require("../models/Cart")


exports.addToCart=async(req,res)=>{
    try {
        const{quantity}=req.body
      const {productId}=req.params
      const product=await Products.findOne({_id:productId})
      if(!product){
        return res.status(403).json({
            success:false,
            msg:"Product not found"
        })
      }
      const cartItem=await Cart.create({
        user:req.user.id,
        product:product._id,
        productQuantity:quantity
      })
      console.log(cartItem)
      
      const user=await  User.findByIdAndUpdate(req.user.id,{$push:{cart:cartItem._id},$set:{totalCartBill:quantity*product.price}},{new:true}).populate("cart")
      console.log(user)
      res.status(200).json({
        success:true,
        msg:"Added to cart",
        user
      })
    } catch (error) {
        console.log(error)
    }
 
}

