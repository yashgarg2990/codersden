require("dotenv").config()
const User =require("../models/User")
const mailSender = require("../utils/Mailsender")
const bcrypt= require("bcrypt")

// reset password token 

exports.resetPasswordToken = async (req,res) =>{
    try {
        const {Email} = req.body
        if(!Email) {
            return res.status(400).json({message:"Email is required"})
        }
        const existingUser = await User.findOne({Email})
        if(!existingUser) {
            return res.status(400).json({message:"User does not exist"})
            }
            const token = crypto.randomUUID();
            const UpdatedDetails =await User.findOneAndUpdate ({Email: Email} ,
                {ResetToken: token, resetTokenExpireAt: Date.now() + 5*60*1000},
                {new: true}
            )
            const url =`http://localhost:3000/reset-password/${token}`
            await mailSender(Email ,
                "Reset Password Link",
                `reset password link  : ${url}`
                
            ) 
            res.status(200).json({message: "Reset password link sent to your email"})
    }
    catch(error) {
        console.log("error while reseting password " ,error)
        return res.status(500).json({message: error.message})
    }
    
}

exports.resetPassword = async (req, res) => {
    try {
        const { NewPassword, ConfirmPassword, Token } = req.body;
        console.log(req.body);
        
        if (!NewPassword || !ConfirmPassword || !Token) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ ResetToken: Token });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid token" });
        }

        if (existingUser.ResetTokenExpireAt < Date.now()) {
            return res.status(400).json({ message: "Token expired" });
        }

        if (NewPassword !== ConfirmPassword) {
            return res.status(400).json({ message: "NewPassword and Confirm Password do not match" });
        }

        const hashedPassword = await bcrypt.hash(NewPassword, 10);

        const updatedDetails = await User.findOneAndUpdate(
            { ResetToken: Token },
            {
                Password: hashedPassword,
                ResetToken: "",
                ResetTokenExpireAt: ""
            },
            { new: true }
        );

        res.status(200).json({
            message: "Password reset successfully",
            user: updatedDetails
        });
    } catch (error) {
        console.log("error while resetting password", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
