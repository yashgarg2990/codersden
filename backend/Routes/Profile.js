const express = require("express")
const router = express.Router()
const {auth , isStudent , isInstructor} = require("../middlewares/auth")

const {UpdateProfile , updateDisplayPicture , DeleteProfile ,  getAllUserDetails , getYourDetail , getEnrolledCourse} = require("../controllers/ProfileController")

router.post("/update-profile" ,auth ,UpdateProfile)
router.post("/update-display-image" , auth , updateDisplayPicture)
router.post("/delete-profile" , auth , DeleteProfile)
router.get("/get-all-user-details" ,  getAllUserDetails)
router.get("/get-your-details" , auth , getYourDetail)
router.get("/get-enrolled-course" , auth , getEnrolledCourse)


module.exports = router 