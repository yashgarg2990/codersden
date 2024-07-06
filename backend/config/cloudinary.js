const cloudinary =require("cloudinary").v2
require("dotenv").config()
const ConnectToCloudinary = () =>{
    try{
        cloudinary.config({
            cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
            api_key:process.env.CLOUDINARY_API_KEY,
            api_secret:process.env.CLOUDINARY_API_SECRET
    
        })
        console.log("Connected to Cloudinary ")
    }
    catch(error) {
        console.log("Error while connecting to Cloudinary ",error)
        res.status(500).json({
            message:"Error while connecting to Cloudinary",
            error:error
        })

    }

    

     
}
module.exports=ConnectToCloudinary