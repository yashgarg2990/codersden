const cloudinary = require("cloudinary").v2; //! Cloudinary is being required

exports.cloudinaryConnect = () => {
    try {
        cloudinary.config({
            //!    ########   Configuring the Cloudinary to Upload MEDIA ########
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        console.log("Cloudinary connected successfully"); // Log on successful connection
    } catch (error) {
        console.log(error);
    }
};