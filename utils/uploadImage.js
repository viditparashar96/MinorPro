const cloudinary = require('cloudinary');

exports.imageUploader=async(file)=>{
    try {
        // const options={"codehelp"}
       return  await cloudinary.v2.uploader.upload(file.tempFilePath,{
        folder:"codehelp",
        resource_type:"auto"
       });
       
    } catch (error) {
        console.log("err in uploading the file=>",error)
    }
  
}