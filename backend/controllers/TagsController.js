const  Category =require ("../models/Category") 

exports.createCategory = async (req,res )=>{
    try{ 
        const {Name , Description} = req.body ; 
        if(!Name || !Description) {
            return res.status(400).json({msg : "Please fill all the fields" })
        }

        const newtags = await Category.create({Name: Name , Description : Description})
        console.log(newtags) 
        res.status(201).json({
            success : true,
            data : newtags
        })

    }
    catch(error) {
        console.log("error while creating tags " , error)
        res.status(400).json({error: error.message ,
            message : " Error while creating tags"
        })

    }
}

exports.getAllCategory = async (req , res) =>{
    try {
         const tags = await Category.find({},
            {
                Name : true , 
                Description : true
            }
         )
         res.status(200).json({
            success : true,
            data : tags
         })
    }
    catch(error) {
        console.log("error while getting tags " , error)
        res.status(400).json({error: error.message ,
            message : " Error while getting tags"
        })
    }
}

exports.categoryPageDetails  = async (req,res) =>{
    try{
         const {categoryID} = req.body ;
         if(!categoryID) {
            return res.status(400).json({msg : "No category Id receieved " })
         }
         // show courses of that particular category 
         const categoryCourses = await Category.findById({_id : categoryID}).populate("Course").exec()

         // find courses of diffrent category 
         
         const diffrentCourse = await Category.find({
            _id : { $ne : categoryID},
         }).populate("Course").exec()

         // get the  courses in descending order of student enrolled 
         const topCourses = await Course.find({})
  .sort({ StudentsEnrolled: -1 }) // Sorting by the length of the StudentsEnrolled array in descending order
  .limit(10); // Limiting the results to the top 10 courses

    res.status(200).json({
        success : true,
        data : {categoryCourses , diffrentCourse , topCourses}
    })

    }
    catch(error) {
      console.log("error in getting Category courses ", error )
      res.status(500).json({
        error : error.message ,
        message : "Server error "
      })
    }
}