const mongoose = require("mongoose");
const ProfileSchema = mongoose.Schema({
  Address: {
    type: String,
    trim: true
  },
  AlternateNumber: {
    type: Number
  },
  About: {
    type: String,
    trim: true
  },
  DateOfBirth: {
    type: Date
  }
})

module.exports=mongoose.model("Profile",ProfileSchema)