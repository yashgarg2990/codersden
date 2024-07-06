const mongoose=require("mongoose");
const SubSectionSchema = mongoose.Schema({
    Title:{
        type:String,
    },
    Description:{
        type:String,
    },
    Duration:{
        type : String,
    },
    Video_URL:{
        type:String
    }
  })
  
  module.exports=mongoose.model("SubSection",SubSectionSchema)