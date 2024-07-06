const User = require("../models/User")
const Course = require("../models/Course")
const Category = require("../models/Category")
require("dotenv").config()
const {uploadToCloudinary , isSupported } =require("../utils/ImageUploader")
const { populate } = require("dotenv")

exports.CreateCourse = async (req, res) => {
  try {
      const {
          CourseName,
          CourseDescription,
          WhatYouWillLearn,
          Price,
          CourseCategory,
      } = req.body;

      const uploadedImage = req.files.ThumbnailImage;

      if (!CourseName || !CourseDescription || !WhatYouWillLearn || !Price || !CourseCategory || !uploadedImage) {
          return res.status(400).json({ msg: "Please fill all the fields" });
      }

      const userId = req.user.id;
      const instructorDetails = await User.findById(userId);

      if (!instructorDetails) {
          return res.status(400).json({ msg: "Instructor not found" });
      }

      const ImageTypes = ["jpg", "jpeg", "png"];
      const fileExtension = uploadedImage.name.split(".").pop().toLowerCase();

      if (!isSupported(fileExtension, ImageTypes)) {
          return res.status(400).json({ msg: "Please upload a valid image file" });
      }

      const categoryDetails = await Category.findById(CourseCategory);

      if (!categoryDetails) {
          return res.status(400).json({ msg: "Category not found" });
      }

      const thumbnailUrl = await uploadToCloudinary(uploadedImage, "images");

      const newCourse = await Course.create({
          CourseName,
          CourseDescription,
          WhatYouWillLearn,
          Price,
          ThumbnailImage: uploadedImage.secure_url,
          Instructor: instructorDetails._id,
          Category: CourseCategory // Assuming CourseCategory is already the ID
      });

      await User.findByIdAndUpdate(
          { _id: instructorDetails._id },
          { $push: { Courses: newCourse._id } },
          { new: true }
      );

      await Category.findByIdAndUpdate(
          { _id: categoryDetails._id },
          { $push: { Courses: newCourse._id } },
          { new: true }
      );

      return res.status(200).json({ msg: "Course Created Successfully", newCourse });

  } catch (error) {
      console.log("Error while creating a course", error);
      return res.status(500).json({ msg: "Internal Server Error", error: error.message });
  }
};
// get all courses handler

exports.showAllCourses = async(req ,res) =>{
       try {
        const Courses = await Course.find().populate("Instructor").populate("Category").exec()
        return res.status(200).json({msg : "Courses fetched successfully" , Courses})
            
       }
       catch(error) {
        console.log("Error while getting all courses ",error )
        return res.status(500).json({msg : "Internal Server Error" , error : error })
       }
}


exports.getCourseDetails = async (req, res) => {
    try {
      const { courseID } = req.body;
      const courseDetails = await Course.findById(courseID)
        .populate({
          path: "Instructor",
          populate: {
            path: "AdditionalDetails"
          }
        })
        .populate("Category")
        .populate("Rating")
        .populate({
          path: "CourseContent",
          populate: {
            path: "SubSection"
          }
        })
        .exec();
  
      if (!courseDetails) {
        return res.status(400).json({
          message: "No course found"
        });
      }
  
      // Add the number of students enrolled to the courseDetails
      const numberOfStudentsEnrolled = courseDetails.StudentsEnrolled ? courseDetails.StudentsEnrolled.length : 0;
  
      res.json({
        courseDetails,
        numberOfStudentsEnrolled
      });
    } catch (error) {
      console.log("Error in fetching details about a course", error);
      return res.status(500).json({
        error: "Something went wrong. Try again later."
      });
    }
  };