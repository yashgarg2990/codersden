const mongoose=require("mongoose");
const SubSection = require("./SubSection");
const SectionSchema = mongoose.Schema({
      SectionName:{
        type:String,
        
      },
       SubSection:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSection"
       }]
       
  })
  
  module.exports=mongoose.model("Section",SectionSchema)