const Rating  = require("../models/Course")
const Course = require("../models/Course")
const User =  require("../models/User")

exports.createRating  = async (req,res) =>{
    try {
        const UserID = req.user.id;
        const {rating , review , CourseID} = req.body
        const courseDetails  = await Course.findOne({_id  : CourseID , 
            StudentsEnrolled : {$elemMatch : {$eq : UserID}}
        });
        if(!courseDetails) {
            return res.status(400).json({msg : "You are not enrolled in this course" })
        }
        const alreadyReviewed = await Rating.findOne({User :  UserID  ,  Course : CourseID})
        if(alreadyReviewed) { 
            return res.status(400).json({msg : "You have already reviewed this course" })
        }
        // create Rating and Review 
        const newRating = await Rating.create({
            Rating : rating , 
            Review : review ,
            User : UserID ,
            Course : CourseID
        })
        // Update the course with the rating 
        const updatedCourse = await Course.findByIdAndUpdate({_id : CourseID} , 
            { $push : {Rating : newRating._id }}
         )
         res.json({msg : "Rating Created" , newRating , updatedCourse})
    }
    catch(error){
        console.log( "error in creating rating " ,error)

    }
}


exports.getAverageRating = async (req, res) => {
    try {
      const courseId = req.body.CourseID; // Assuming the course ID is passed as a URL parameter
  
      // Aggregation pipeline to calculate the average rating for the specified course
      const result = await Rating.aggregate([
        {
          $match: { Course: mongoose.Types.ObjectId(courseId) }
        },
        {
          $group: {
            _id: "$Course",
            averageRating: { $avg: "$Rating" }
          }
        }
      ]);
  
      if (result.length === 0) {
        return res.status(404).json({ message: "No ratings found for this course" });
      }
  
      res.json({ courseId, averageRating: result[0].averageRating });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };

  // get all rating and review for a  course 

  
exports.getCourseRatings = async (req, res) => {
    try {
      const courseId = req.params.courseId; // Assuming the course ID is passed as a URL parameter
  
      const course = await Course.findById(courseId)
        .populate({
          path: 'Rating',
          select: 'Rating Review -_id', // Selecting only Rating and Review fields, excluding _id
        });
  
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      res.json(course.Rating);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
exports.getAllRatings = async (req, res) => {
    try {
      const ratings = await Rating.find()
        .sort({ Rating: -1 }) // Sort by Rating in descending order
        .populate({
          path: 'User',
          select: 'FirstName LastName Email Image -_id', // Selecting specific fields from User
        })
        .populate({
          path: 'Course',
          select: 'CourseName -_id', // Selecting specific fields from Course
        });
  
      res.json(ratings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  