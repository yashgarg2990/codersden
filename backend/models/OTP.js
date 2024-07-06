const mongoose = require("mongoose");
const mailSender = require("../utils/Mailsender");


const OTPSchema = mongoose.Schema({
  Email: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600 // 5 minutes
  }
});
// how to make sure that this things deletes after 5 min

module.exports = mongoose.model('OTP', OTPSchema);


async function sendVerificationEmail (email , otp) {
    try{
       const mailResposne= await mailSender (email , " verificaation by Coders Den " , otp)
       console.log(mailResposne)
    }
    catch(err){
        console.log("error while sending email",err)
        throw err
    }
}
OTPSchema.pre("save" , async  function (next){
    await sendVerificationEmail(this.Email ,  this.otp)
    next()
})

module.exports=mongoose.model("OTP-model",OTPSchema)