const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Assuming you have a User model for user information
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  productQuantity:{
    type:Number,
    default:1
  },
 
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
