const cloudinary = require("cloudinary") 
function uploadToCloudinary(file, folder , quality) {
    const options = { folder };
    options.resource_type="auto"
    if(quality){
        options.quality = quality
    }
    
    return cloudinary.uploader.upload(file.tempFilePath, options)
      
}

function isSupported(fileExtension, supportedTypes) {
    return supportedTypes.includes(fileExtension);
}

function deleteFromCloudinary(publicId) {
    return cloudinary.uploader.destroy(publicId);
}
module.exports = {uploadToCloudinary, isSupported , deleteFromCloudinary}