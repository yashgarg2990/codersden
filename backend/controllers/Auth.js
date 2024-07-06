const User = require ("../models/User")
const OTP =require ("../models/OTP")
const Profile =require ("../models/Profile")
const bcrypt = require("bcrypt")
const otpGenerator = require("otp-generator")
const mailSender =require("../utils/Mailsender")
const jwt = require("jsonwebtoken")
const {uploadToCloudinary, isSupported} = require("../utils/ImageUploader")
 // Otp generator for verifying while user sign up

 
exports.OTPsender = async (req, res) => {
  try {
    const { Email } = req.body;
    if (!Email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    const user = await User.findOne({ Email: Email });
    if (user) {
      return res.status(401).json({
        success: false,
        message: "User already exists"
      });
    }
   
    

    let otp;
    do {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false
      });
    } while (await OTP.findOne({ otp: otp }));

    const existence  = await OTP.findOne({Email  : Email})
    if(existence){const emailexist = await OTP.findOneAndUpdate({Email : Email} ,
      {otp  : otp}
    )}

else { const newOtp = new OTP({ otp: otp, Email: Email });
await newOtp.save();}
    // If we reach this point, the OTP is unique and not in the DB
    

    // Send the OTP to the user via email
    const mailResponse = await mailSender(
      Email,
      "Coders den OTP verification",
      `Here is the OTP for your verification: ${otp}`
    );
    
    console.log(mailResponse);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully"
    });

  } catch (error) {
    console.log("Error in sending OTP", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while sending OTP"
    });
  }
};

  exports.Signup =async (req ,res) =>{
    try {
        const  {
           FirstName ,
           LastName ,
           Mobile ,
           Gender ,
           Email ,
           Password , 
           ConfirmPassword, 
           AccountType, 
           otp
        } = req.body
        console.log(req.body)
        if(!FirstName ||  !LastName || !Mobile || !Gender || !Email || !Password || !ConfirmPassword  || !AccountType || !otp ) {
            return res.status(401).json({
                success : false ,
                message : " Please enter all the deatils "
            })
        }
        if( await User.findOne({Email:Email})){
            return res.status(401).json({
                success : false ,
                message : " User already Exist  "
            })
        }
        if( ConfirmPassword !== Password ){
            return res.status(401).json({
                success : false ,
                message : " Passwords do not match   "
            })
        }
        const recentOTP = await OTP.findOne({ Email: Email })
        console.log("this is recent otp",recentOTP)
        if(recentOTP.length == 0) {
            return res.status(401).json({
                success : false ,
                message : " OTP not found  "

            })
        }
        else if ( otp !== recentOTP.otp) {
            return res.status(401).json({
                success : false ,
                message : " OTP do not Match  "

            })
        }

        const hashedPassword = await  bcrypt.hash(
            Password,
            10
        ).catch((error) =>{
            return res.status(401).json({
                success : false , 
                message : " Password hashing error  "
                })
        })

        const ProfileDetails = await Profile.create({
            Address : null ,
            AlternateNumber : null ,
            About : null , 
            DateOfBirth : null 
        })
        const user = await User.create({
            FirstName : FirstName ,
             LastName : LastName,
             Mobile : Mobile ,
             Gender : Gender ,
             Email : Email ,
             Password : hashedPassword,
             AccountType : AccountType,
             AdditionalDetails : ProfileDetails._id ,
             Image: `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(`${FirstName} ${LastName}`)}`



        })
        res.status(201).json({
            success : true ,
            message : " User Created Successfully " ,
            user : user
        })


    }
     catch (error) {
      console.log(error)
         return res.status(501).json({
            success : false ,
            message : " Internal Server Error User cannot be registered "
         })
     }
  }

  exports.login = async (req, res) => {
    try {
      // Extract Email and Password from the request body
      const { Email, Password } = req.body;
      
      // Check if both Email and Password are provided
      if (!Email || !Password) {
        return res.status(400).json({
          success: false,
          message: "Please enter all the fields"
        });
      }
  
      // Find the user by Email
      const existingUser = await User.findOne({ Email });
      
      // If the user does not exist, return an error response
      if (!existingUser) {
        return res.status(401).json({
          success: false,
          message: "User does not exist"
        });
      }
  
      // Compare the provided password with the stored hashed password
      const isPasswordCorrect = await bcrypt.compare(Password, existingUser.Password);
      
      // If the password is incorrect, return an error response
      if (!isPasswordCorrect) {
        return res.status(401).json({
          success: false,
          message: "Invalid Credentials"
        });
      }
  
      // Prepare the payload for the JWT token
      const payload = {
        Email: existingUser.Email,
        AccountType: existingUser.AccountType,
        id: existingUser._id
      };
  
      // Sign the JWT token
      const token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h"
      });
  
      // Convert the user object to a plain JavaScript object
      const userObject = existingUser.toObject();
      
      // Attach the token to the user object and remove the password field
      userObject.token = token;
      userObject.Password = undefined;
  
      // Define cookie options
      const cookieOptions = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true
      };
  
      // Set the cookie and send the response
      res.cookie("token", token, cookieOptions).status(200).json({
        success: true,
        token,
        user: userObject,
        message: "Logged in successfully"
      });
  
    } catch (error) {
      // Log the error and send an error response
      console.log("Error while logging in:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error: User cannot login"
      });
    }
  };
  
  //Change Password 
  exports.changePassword = async (req, res) => {
    try {
      const { OldPassword, NewPassword, ConfirmPassword } = req.body;
  
      if (!OldPassword || !NewPassword || !ConfirmPassword) {
        return res.status(401).json({
          success: false,
          message: "Please enter all the fields"
        });
      }
  
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found"
        });
      }
  
      const isOldPasswordCorrect = await bcrypt.compare(OldPassword, user.Password);
      if (!isOldPasswordCorrect) {
        return res.status(401).json({
          success: false,
          message: "Old password is incorrect"
        });
      }
  
      if (NewPassword !== ConfirmPassword) {
        return res.status(401).json({
          success: false,
          message: "New password and confirm password do not match"
        });
      }
  
      const hashedNewPassword = await bcrypt.hash(NewPassword, 10);
      user.Password = hashedNewPassword;
      await user.save();
  
      res.status(200).json({
        success: true,
        message: "Password changed successfully"
      });
    } catch (error) {
      return res.status(501).json({
        success: false,
        message: "Internal Server Error: User cannot change password"
      });
    }
  };
  