const express = require("express")
const router = express.Router()

// importing middlewares 
const {auth , isStudent , isInstructor , isAdmin} = require("../middlewares/auth")

// importing course controllers 
const {CreateCourse , showAllCourses , getCourseDetails} = require("../controllers/CourseCreator")

// importing Category controllers 
const {createCategory , getAllCategory , categoryPageDetails} = require("../controllers/TagsController")

// importing section controllers 
const {createSection , updateSection , deleteSection} = require("../controllers/SectionController")

// importing subsection controllers 

const {createSubSection,updateSubSection,deleteSubSection} = require("../controllers/SubSectionController")

// importiong Rating controllers 

const {createRating, getAverageRating, getCourseRatings , getAllRatings} = require("../controllers/RatingAndReview")

router.post("/create-course" , auth , isInstructor , CreateCourse)

router.post("/add-section" , auth , isInstructor , createSection)
router.post("/update-section" ,auth , isInstructor , updateSection)
router.post("/delete-section" ,auth , isInstructor , deleteSection)


router.post("/add-subsection" , auth , isInstructor , createSubSection)
router.post("/update-subsection" ,auth , isInstructor , updateSubSection)
router.post("/delete-subsection" ,auth , isInstructor , deleteSubSection)


// get info about all course ]

router.get("/show-allcourses" ,showAllCourses)

// details about a specific course 

router.get("/get-course-details" , getCourseDetails)

// rating routes 
router.post("/create-rating" , auth , isStudent , createRating)
router.get("/avg-rating-of-course" , getAverageRating)
router.get("/get-course-ratings" ,getCourseRatings)
router.get("/get-all-ratings" , getAllRatings)

// category routes 
router.post("/create-category" , auth ,isAdmin  , createCategory)
router.get("/get-all-category" , getAllCategory)
router.get("/category-page-details" ,categoryPageDetails)

module.exports = router 

