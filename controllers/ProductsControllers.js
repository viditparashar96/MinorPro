const Products=require("../models/Products")
const Review=require("../models/Reviews")
const {extractExtension}=require("../utils/extractextension")
const { imageUploader } = require("../utils/uploadImage")

exports.createProduct=async(req,res)=>{
    try {
        const {title,description,price,category,stockQuantity}=req.body
        // console.log(title,description,price,category,stockQuantity)
      
        const  {photo}=req.files
        if(!title || !description || !price  || !category || !stockQuantity){
            res.status(403).json({
                success:false,
                msg:"Fill up the blank"
            })
        }
        if(!photo){
            res.status(403).json({
                success:false,
                msg:"File not found"
            })
        }
        // console.log("photo file==>",photo)
       const extension= extractExtension(photo)
    //    console.log(extension)

       const validImageExtension=[".jpeg",".png",".webp",".jpg"]
       if(!validImageExtension.includes(extension)){
        res.status(403).json({
            success:false,
            msg:"Not valid image file"
        })
       }

      const imageResult= await imageUploader(photo)
       const  createdProduct=await Products.create({
        user:req.user.id,
        title,
        description,
        price,
        category,
        stockQuantity,
        imageUrl:imageResult.secure_url
       })


        res.status(201).json({
            success:true,
            msg:"Product created successfuly"
        })
    } catch (error) {
        console.log("err in creating product",error)
    }
   



}
exports.getAllProducts=async(req,res)=>{
    const allProducts=await Products.find({})
    if(!allProducts){
        return res.status(200).json({
            success:false,
            msg:"No products availabe"
        })
    }
    res.status(200).json({
        success:true,
        msg:"All products fecthed ",
        allProducts
    })

}
exports.updateProduct=async(req,res)=>{
    try {
        const {title,description,price,category,stockQuantity}=req.body
        const {id}=req.params
        const updatedProduct=await Products.findByIdAndUpdate(id,{$set:{title,price,description,category,stockQuantity}},{new:true})
       
        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                msg: "Product not found"
            });
        }
        res.status(400).json({
            success:true,
            msg:"Product Updated"
        })
    } catch (error) {
        console.log(error)
    }
 
}
exports.createReview=async(req,res)=>{
   try {
    const {rating,title,text}=req.body

    const createdReview=await Review.create({
    user:req.user.id,
    product:req.params.productId,
     rating,
     title,
     text
 
    })
    console.log(createdReview)
    const updatedProduct=await Products.findByIdAndUpdate(req.params.productId,
     {$push:{
         reviews:createdReview._id
     }},
     {new:true}
     ).populate("reviews")
     console.log(updatedProduct)
     res.status(200).json({
        success:true,
        updatedProduct,
        msg:"Thanks for the review"
     })
   } catch (error) {
    console.log(error)
   }
}