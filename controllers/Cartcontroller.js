const Products = require("../models/Products");
const User=require("../models/User")


exports.addToCart=async(req,res)=>{
    try {
        const{productId}=req.params;
        const product=await Products.findOne({_id:productId})
        if(!product){
            return res.status(403).json({
                succuss:false,
                msg:"Product is not present"
            })
        }
        const currentUser=await User.findByIdAndUpdate(req.user.id,{$push:{cart:product._id}},{new:true}).populate("cart")
        console.log(currentUser)
        res.status(200).json({
            success:true,
            msg:"Product is Added to cart",
            currentUser

        })
    } catch (error) {
        console.log(error)
    }
 
}
exports.removeFromCart=async(req,res)=>{
    try {
        const{productId}=req.params;
        const product=await Products.findOne({_id:productId})
        if(!product){
            return res.status(403).json({
                succuss:false,
                msg:"Product is not present"
            })
        }
        const currentUser=await User.findByIdAndUpdate(req.user.id,{$pull:{cart:product._id}},{new:true})
        console.log(currentUser)
        res.status(200).json({
            success:true,
            msg:"Product is deleted from cart",
            currentUser

        })
    } catch (error) {
        console.log(error)
    }
    
}