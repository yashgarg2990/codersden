const express= require("express")
const router = express.Router()

const  {OTPsender , Signup , login , changePassword} = require("../controllers/Auth")
const {resetPasswordToken , resetPassword} = require("../controllers/ForgotPass")
const {auth , isStudent , isInstructor} = require("../middlewares/auth")

router.post("/signup" , Signup)
router.post("/login" , login)
router.post("/otp" , OTPsender)
router.post("/reset-password-token" , resetPasswordToken)
router.post("/reset-password" , resetPassword)
router.post("/change-password" , auth , changePassword )

module.exports = router 



