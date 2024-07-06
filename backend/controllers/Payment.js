const {instance} = require("../config/Razorpay")
const User = require("../models/User")
const Course = require("../models/Course")
const {mailSender} = require("../utils/Mailsender")
const { default: mongoose } = require("mongoose")

exports.capturePayment = async(req,res) =>{
    const {CourseID} = req.body;
    const UserID = req.user.id;
    if(!CourseID) {
        return res.status(400).json({error: "CourseID is required."})
    }
    let courseDetails;
    try{
       courseDetails = await Course.findById(CourseID)
       if(!courseDetails) {
        return res.status(400).json({error: "Course not found."})
       }
       // if user already paid for the course 
       const uid = mongoose.Types.ObjectId(UserID);
       if(courseDetails.StudentsEnrolled.includes(uid)){
        return res.status(400).json({error: "You have already paid for this course."})
       }


    }
    catch(error) {
          console.log("error  in finding courseDetails in Payment Page " , error)
          return res.status(500).json({
            error: "Something went wrong. Please try again later."
          })
    }

    const amount  = courseDetails.Price;
    const currency = "INR";
    const options = {
        amount: amount * 100,
        currency,
        receipt : Math.random(Date.now()).toString(),
        notes:{
            CourseID : CourseID,
            UserID : UserID
        }
    }
    try{
        const paymentResponse = await instance.orders.create(options)
        console.log(paymentResponse)
        return res.status(200).json({
            success  : true , 
            courseName : courseDetails.CourseName,
            courseDescription  :courseDetails.CourseDescription,
            order_id:paymentResponse.id,
            amount:amount,
            currency:currency,
        })
    }
    catch(error) {
        console.log("error in creating payment order ", error)
        res.status(500).json({
            error: "Something went wrong. error in creating order ."
        })
    }

}

// verify signature of RazorPay and Server 
exports.verifySignature = async(req,res) =>{
 
    const  webhooksecret = "12345678" 
    const  signature = req.headers['x-razorpay-signature']
    const shasum = crypto.createHmac("sha256" , webhooksecret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest("hex")
    if(digest === signature){
        console.log("signature verified")
        const {CourseID , UserID} =req.body.payload.payment.entity.notes;
        try {
            const enrolledcourse = await Course.findOneAndUpdate({_id : CourseId} ,
                {$push : {StudentsEnrolled : UserID}},
                {new : true}
            )
            if(!enrolledcourse) {
                return res.status(500).json({ 
                    error : "Something went wrong. error in updating course"
                })
            }
            const enrolledStudent = await User.findOneAndUpdate({_id:UserID} , 
                {$push : {Courses : CourseID}},
                {new : true}
            )
            if(!enrolledStudent) { 
                return res.status(500).json({ 
                    error : "Something went wrong. error in updating user"
                })
            }
            const mailResponse  = await mailSender(
                enrolledStudent.Email , 
                "Time to be Exceptional" ,
                "You have successfully enrolled in the course , Now lets get started "
            )
            return res.status(200).json({
                success : true, 
                message : "Payment Successfull and Course purchase successfull"
            })

        }
        catch(error){
            console.log("error in updating course and student ", error)
        }
    }
    else{
        console.log("signature not verified")
        res.status(500).json({
            error : "Something went wrong. error in verifying signature"
         })
        
    }


}