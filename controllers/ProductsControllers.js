const Products=require("../models/Products")
const {extractExtension}=require("../utils/extractextension")
const { imageUploader } = require("../utils/uploadImage")

exports.createProduct=async(req,res)=>{
    try {
        const {title,description,price,category,stockQuantity}=req.body
        console.log(title,description,price,category,stockQuantity)
      
        const  {photo}=req.files
        if(!title || !description || !price  || !category || !stockQuantity || !photo){
            res.status(403).json({
                success:false,
                msg:"Fill up the blank"
            })
        }
        console.log("photo file==>",photo)
       const extension= extractExtension(photo)
       console.log(extension)

       const validImageExtension=[".jpeg",".png",".webp",".jpg"]
       if(!validImageExtension.includes(extension)){
        res.status(403).json({
            success:false,
            msg:"Not valid image file"
        })
       }

      const imageResult= await imageUploader(photo)
       const  createdProduct=await Products.create({
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