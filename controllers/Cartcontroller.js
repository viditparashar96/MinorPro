const Products = require("../models/Products");
const User=require("../models/User")
const Cart=require("../models/Cart")


exports.addToCart=async(req,res)=>{

    try {
      const {quantity}=req.body
      console.log(quantity)
       console.log(req.params.productId)
      const currentUser=await User.findById(req.user.id)
      const product=await Products.findById(req.params.productId)
      const itemExist=await Cart.findOne({product:product._id})
      
      if(itemExist){
        itemExist.productQuantity+=1
        itemExist.save()
        return res.status(200).json({
          msg:"Added",
          success:true
        })
      }
      currentUser.cart.push(product._id)
      const cart=await Cart.create({
        user:currentUser._id,
        product:product._id,
        productQuantity:quantity
      })

     await currentUser.save()


      res.status(200).json({
        success:true,
        msg:"Product Added Successfully",
        currentUser,
        cart
      })
      
    } catch (error) {
      console.log(error)
    }


}

exports.removeFromCart=async(req,res)=>{

  try {

     console.log(req.params.productId)
    const currentUser=await User.findById(req.user.id)
    const product=await Products.findById(req.params.productId)
    const itemExist=await Cart.findOne({product:product._id})
    const cart=await Cart.find({})
    console.log(cart)
    
    if(!itemExist){
      
      return res.status(400).json({
        success:false,
        msg:"Item does not exist",
      })
    }
    const productIndex=currentUser.cart.indexOf(product._id)
    currentUser.cart.splice(productIndex,1)
   await currentUser.save()
   
    await Cart.findByIdAndRemove(itemExist._id);
   

  


    res.status(200).json({
      success:true,
      msg:"Product Added Successfully",
      currentUser,
      
    })
    
  } catch (error) {
    console.log(error)
  }


}

