const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
        trim: true
    },
    LastName: {
        type: String,
        required: true,
        trim: true
    },
    Mobile: {
        type: Number,
        required: true
    },
    Gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"]
    },
    Email: {
        type: String,
        required: true,
        trim: true
    },
    Password: {
        type: String,
        required: true
    },
    AccountType: {
        type: String,
        required: true,
        enum: ["Admin", "Student", "Instructor"]
    },
    AdditionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile"
    },
    Image: {
        type: String // or Buffer if you want to store binary data
    },
    CourseProgress: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CourseProgress"
        }
    ],
    Courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ],

    ResetToken:{
        type:String,
    },
    ResetTokenExpireAt:{
        type:Date,
    }
})

module.exports = mongoose.model("User", UserSchema);