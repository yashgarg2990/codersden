const mongoose = require("mongoose");
const CourseSchema = mongoose.Schema({
    
    CourseName:{
        type:String,
        required:true,
        trim:true
    },
    CourseDescription:{
        type:String,
    },
    Instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    WhatYouWillLearn:{
        type:String,
    }, 
    CourseContent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section"
    }],
    Rating:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Rating"
    }],
    Price:{
        type:Number,
    },
    Thumbnail:{
        type:String,
    },
    Tags:{
        type:[String], 
        
    },
    StudentsEnrolled:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    Category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    Instructions:{
        type:String,
    },
    Status:{
        type:String,
        enum:["Published"  , "Drafted"],
    }

})

module.exports = mongoose.model("Course", CourseSchema);