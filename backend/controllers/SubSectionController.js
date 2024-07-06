const Section  = require("../models/Section")
const SubSection = require("../models/SubSection")
const {uploadToCloudinary , isSupported} = require("../utils/ImageUploader")

exports.createSubSection = async (req, res) => {
    try {
      const { SectionID, Title, Description, Duration } = req.body;
      const { Video } = req.files;
      if (!SectionID || !Title || !Description || !Duration || !Video) {
        return res.status(400).json({ error: "Please fill all the fields" });
      }
      const Video_URL = uploadToCloudinary(Video, "CourseVidoes");
      const SubSectionDetails = await SubSection.create({
        Title,
        Description,
        Duration,
        Video: Video_URL.secure_url,
      });
      const SectionDetails = await Section.findByIdAndUpdate(
        { _id: SectionID },
        { $push: { SubSections: SubSectionDetails._id } },
        { new: true }
      );
    } catch (error) {
      console.log("error in creating subsection", error);
    }
  };

  exports.updateSubSection = async (req, res) => {
    try {
      const { SubSectionID, Title, Description, Duration } = req.body;
      const { Video } = req.files;
      if (!SubSectionID || !Title || !Description || !Duration) {
        return res.status(400).json({ error: "Please fill all the fields" });
      }
      let Video_URL;
      if (Video) {
        Video_URL = uploadToCloudinary(Video, "CourseVidoes");
      }
      const SubSectionDetails = await SubSection.findByIdAndUpdate(
        { _id: SubSectionID },
        {
          Title,
          Description,
          Duration,
          Video: Video_URL ? Video_URL.secure_url : undefined,
        },
        { new: true }
      );
      res.json({ message: "SubSection updated successfully" });
    } catch (error) {
      console.log("error in updating subsection", error);
    }
  };

  exports.deleteSubSection = async (req, res) => {
    try {
      const { SubSectionID } = req.params;
      if (!SubSectionID) {
        return res.status(400).json({ error: "SubSection ID is required" });
      }
      const SubSectionDetails = await SubSection.findByIdAndRemove({ _id: SubSectionID });
      if (!SubSectionDetails) {
        return res.status(404).json({ error: "SubSection not found" });
      }
      
      await Section.updateMany({ SubSection: SubSectionID }, { $pull: { SubSection: SubSectionID } });
      res.json({ message: "SubSection deleted successfully" });
    } catch (error) {
      console.log("error in deleting subsection", error);
    }
  };