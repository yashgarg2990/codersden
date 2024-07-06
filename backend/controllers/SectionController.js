const { default: mongoose } = require("mongoose");
const Course  = require("../models/Course")
const Section = require("../models/Section")

exports.createSection = async (req, res) => {
    const { CourseID, SectionName } = req.body;
    if (!CourseID || !SectionName) {
      return res.status(400).json({ error: "Please add all the fields" });
    }
    try {
      const SectionDetails = await Section.create({ SectionName:SectionName });
      const CourseDetails = await Course.findOneAndUpdate(
        { _id: CourseID },
        { $push: { CourseContent: SectionDetails._id } },
        { new: true }
      ).populate({
        path: 'CourseContent',
        populate: { path: 'SubSection' }
      });
  
      return res.status(200).json({ message: "Section Created Successfully" });
    } catch (error) {
      return res.status(400).json({ error: "Something went wrong", message: "Error while creating section", error });
    }
  };
 
  exports.updateSection = async (req, res) => {
    const { SectionID, SectionName } = req.body;
    if (!SectionID ||!SectionName) {
      return res.status(400).json({ error: "Please add all the fields" });
    }
    try {
      const updatedSection = await Section.findByIdAndUpdate(
        SectionID,
        { SectionName },
        { new: true }
      )
  
      return res.status(200).json({ message: "Section Updated Successfully" });
    } catch (error) {
      return res.status(400).json({ error: "Something went wrong", message: "Error while updating section", error });
    }
  };

  exports.deleteSection = async (req, res) => {
    const { SectionID } = req.body; // Assuming SectionID is sent in the body of the request

    if (!SectionID) {
        return res.status(400).json({ error: "Please provide Section ID" });
    }

    try {
        const section = await Section.findByIdAndDelete(SectionID);
        if (!section) {
            return res.status(404).json({ error: "Section not found" });
        }

        // Remove the section from all the courses that have that section
        await Course.updateMany(
            { CourseContent: new mongoose.Types.ObjectId(SectionID) },
            { $pull: { CourseContent: new mongoose.Types.ObjectId(SectionID) } }
        );

        return res.status(200).json({ message: "Section deleted successfully" });
    } catch (error) {
        console.log("Error while deleting section", error);
        return res.status(400).json({ error: "Something went wrong", message: "Error while deleting section", error });
    }
};