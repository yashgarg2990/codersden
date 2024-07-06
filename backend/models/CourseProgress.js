const mongoose = require("mongoose");
const CourseProgressSchema = mongoose.Schema({
  CourseID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Courses"
  },
  CompletedVideo:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"SubSection"
  }]
})

module.exports=mongoose.model("CourseProgress",CourseProgressSchema)