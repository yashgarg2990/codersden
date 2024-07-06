const Profile = require("../models/Profile")
const User = require("../models/User")
const {uploadToCloudinary , isSupported ,deleteFromCloudinary}  = require ("../utils/ImageUploader") 


// will write controller later 
exports.UpdateProfile = async (req, res) => {
    try {
      const { Address, AlternateNumber, About, DateOfBirth } = req.body;
      const UserID = req.user.id;
  
      // Check if the user exists
      const existingUser = await User.findById(UserID);
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      const profileID = existingUser.AdditionalDetails;
  
      // Prepare the update object, only including fields that are provided
      const updateFields = {};
      if (Address !== undefined) updateFields.Address = Address;
      if (AlternateNumber !== undefined) updateFields.AlternateNumber = AlternateNumber;
      if (About !== undefined) updateFields.About = About;
      if (DateOfBirth !== undefined) updateFields.DateOfBirth = DateOfBirth;
  
      // Update the profile
      const updatedProfile = await Profile.findByIdAndUpdate(profileID, updateFields, {
        new: true,
        runValidators: true, // Ensure the update is validated against the schema
      });
  
      if (!updatedProfile) {
        return res.status(404).json({
          success: false,
          message: "Profile not found",
        });
      }
  
      res.status(200).json({
        success: true,
        updatedProfile,
      });
    } catch (error) {
      console.log("Error in updating Profile", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };

exports.DeleteProfile = async(req,res) =>{
    try {
       const UserID = req.user.id ;
       const existingUser = await User.findById(UserID);
       if (!existingUser) {
        return res.status(404).json({ 
            success: false,
            message: "User not found",
        } )
       }
       const profileID = existingUser.AdditionalDetails;
       const profile = await Profile.findByIdAndDelete(profileID);
       if (!profile) { 
        return res.status(404).json({ 
            success: false,
            message: "Profile not found",
        })
       }
       // now delete user too because there can be no user without a profile 
       const deletedUser = await User.findByIdAndDelete(UserID);
       if (!deletedUser) {
        return res.status(404).json({ 
            success: false,
            message: "User not found",
        })
       }
       res.status(200).json({ 
        success: true,
        message: "Profile deleted successfully",
       })
    }
    catch(error) {
        console.log(" error in deleting profile " , error)
        res.status(500).json({ 
            success: false,
            message: "Internal server error",

        })
    }
}

exports.getAllUserDetails = async(req,res) =>{
    try {
       const users = await User.find();
       if (!users) { 
        return res.status(404).json({
            success: false,
            message: "No users found",
        })
       }
       res.status(200).json({ 
        success: true,
        message: "All users found",
        users: users,

       })
    }
    catch(error) {
        console.log("error in showing all users " , error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
         })
    }
}

// now a function to get all details about a particular user given its id in req.user 

exports.getYourDetail = async (req ,res) =>{
    try {
         const UserID = req.user.id
         const user = await User.findById(UserID);
         if (!user) {
            return res.status(404).json({ 
                success: false,
                message: "No user found",

            })
         }
         res.status(200).json({ 
            success: true,
            message: "User found",
            user: user,
         })

    }
    catch(error) {
        console.log("error in showing your details " , error)
        res.status(500).json({ 
            success: false,
            message: "Internal server error",

        })

    }
}

// Now to get info about the enrolled course 
exports.getEnrolledCourse = async (req, res) => {
    try {
      const UserID = req.user.id;
      
      // Find user and populate courses
      const user = await User.findById(UserID).populate('Courses');
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "No user found",
        });
      }
  
      // Get the populated courses
      const enrolledCourses = user.Courses;
  
      res.status(200).json({
        success: true,
        message: "Enrolled courses retrieved successfully",
        courses: enrolledCourses,
      });
    } catch (error) {
      console.log("Error in showing enrolled courses", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };

  
  
  
      // Assuming uploadToCloudinary is an async function
      exports.updateDisplayPicture = async (req, res) => { 
        try {
            const ProfileImage = req.files.ProfileImage;
            const UserID = req.user.id;
    
            // Get the user's current profile image
            const user = await User.findById(UserID);
            const currentImagePublicId = user.Image ? user.Image.split('/').pop().split('.')[0] : null;
    
            // Upload the new profile image
            const uploadedImage = await uploadToCloudinary(ProfileImage, "profileImages");
            const urlOfImage = uploadedImage.secure_url;
    
            // Update the user's profile image in the database
            const updatedUser = await User.findOneAndUpdate(
                { _id: UserID },
                { $set: { Image: urlOfImage } },
                { new: true }
            );
    
            // Delete the old profile image from Cloudinary
            if (currentImagePublicId) {
                await deleteFromCloudinary(currentImagePublicId);
            }
    
            res.status(200).json({
                success: true,
                message: "Display picture updated successfully",
                updatedUser,
            });
        } catch (error) {
            console.log("error in updating display picture ", error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }
      
  