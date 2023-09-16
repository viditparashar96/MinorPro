const cloudinary = require('cloudinary');


exports.connectcloudinary=()=>{
    try {
        cloudinary.config({ 
            cloud_name: 'dkzwksrgs', 
            api_key: '973671373388875', 
            api_secret: 'mj-IqAcn3c7DMpLo3cdGwcT1WcA' 
          })
    } catch (error) {
        console.log("err in connecting clodinay",error)
    }
   
}