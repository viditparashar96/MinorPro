const cloudinary = require('cloudinary');

exports.imageUploader=async(file)=>{
    try {
        
       return  await cloudinary.v2.uploader.upload(file.tempFilePath,{
        folder:"Products(cllg)",
        resource_type:"auto"
       });
       
    } catch (error) {
        console.log("err in uploading the file=>",error)
    }
  
}