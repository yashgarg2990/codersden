const mongoose=require("mongoose");

const CategorySchema = mongoose.Schema({
    Course:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }],
    Name:{
        type:String,
    },
     Description:{
        type:String,
        
    }
       
  })
  
  module.exports=mongoose.model("Category",CategorySchema)