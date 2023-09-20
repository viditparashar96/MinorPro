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
      if (quantity < 1 || quantity > product.stockQuantity) {
        return res.status(400).json({
          success: false,
          msg: 'Invalid quantity',
        });
      }
      
      const user=await User.findOne({_id:req.user.id})
      user.cart.push(product._id)
      user.totalCartBill+=quantity*product.price
      await user.save()
      console.log(user)
      
      
      
    
      
      res.status(200).json({
        success:true,
        msg:"Added to cart",
       
      })
    } catch (error) {
        console.log(error)
    }
 
}

exports.removeFromCart = async (req, res) => {
  try {
    const{quantity}=req.body
    const { productId } = req.params;
    const user = await User.findOne({ _id: req.user.id });
    const product=await Products.findOne({_id:productId})
    if (!product) {
      return res.status(401).json({
        success: false,
        msg: 'Product not found',
      });
    }
    if (!user) {
      return res.status(401).json({
        success: false,
        msg: 'User not found',
      });
    }

    const productIndex = user.cart.indexOf(productId);

    if (productIndex === -1) {
      return res.status(400).json({
        success: false,
        msg: 'Product not found in cart',
      });
    }

    // Remove the product from the cart
    user.cart.splice(productIndex, 1);
    user.totalCartBill-=quantity*product.price
    await user.save();

    res.status(200).json({
      success: true,
      msg: 'Removed from cart',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: 'Internal Server Error',
    });
  }
};
