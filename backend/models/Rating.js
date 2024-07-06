const mongoose=require("mongoose");

const RatingSchema = mongoose.Schema({
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    Rating:{
        type:Number,
    },
    Review:{
        type:String,
        
    }, 
    Course:{
         type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }
       
  })
  
  module.exports=mongoose.model("Rating",RatingSchema)