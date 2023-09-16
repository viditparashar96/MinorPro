const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"

  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    // enum: ['Electronics', 'Clothing', 'Home & Kitchen', 'Books', 'Toys', 'Other'],
  },
 
  imageUrl: {
    type: String,
    required: true,
  },
  stockQuantity: {
    type: Number,
    required: true,
    min: 0,
  },
  ratings: [{ type: Number }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  createdAt:{
    type:Date,
    default:Date.now()
  },
  updatedAt:{
    type:Date,
    default:Date.now()
  }
});

const Product = mongoose.model('Products', productSchema);

module.exports = Product;
