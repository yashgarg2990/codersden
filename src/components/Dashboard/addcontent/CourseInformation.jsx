import { useEffect ,useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import RequirementsField from "./Requirementlist";

import {setCourse , setStep} from "../../../slices/courseSlice"
import {COURSE_STATUS} from "../../../utils/constants"

import IconBtn from "../../IconBtn";
import  {fetchCategories} from "../../../services/operations/courseApi"
import { editCourseDetails , addCourseDetails } from "../../../services/operations/courseApi";
import ChipInput from "./ChipInput";
import Upload from "./Upload";



function CourseInformation() {
    const {
        register , handleSubmit , setValue , getValues  ,formState:{errors},
    }  =useForm()

    const dispatch   = useDispatch() 
    const {token} = useSelector((state) =>  state.auth)
    const {course , editCourse} = useSelector((state) => state.course)
    const [loading, setLoading] = useState(false)
    const [courseCategories, setCourseCategories] = useState([])

    
  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchCategories(token)
      if (categories.length > 0) {
         console.log("categories", categories)
        setCourseCategories(categories)
      }
      setLoading(false)
    }
    // if form is in edit mode
    if (editCourse) {
      // console.log("data populated", editCourse)
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
    }
    getCategories()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
 useEffect(()=>{
    console.log(courseCategories)
 },[courseCategories])
  const isFormUpdated = () => {
    const currentValues = getValues()
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true
    }
    return false
  }

  const onSubmit = async (data) => {
    console.log("Entering onSubmit function in CourseInformation");
    
    let formData = new FormData();
    console.log("Data object:", data);

    if (editCourse) {
        if (isFormUpdated()) {
            const currentValues = getValues();

            formData.append("courseId", course._id);

            if (currentValues.courseTitle !== course.courseName && data.courseTitle) {
                formData.append("courseName", data.courseTitle);
            }
            if (currentValues.courseShortDesc !== course.courseDescription && data.courseShortDesc) {
                formData.append("courseDescription", data.courseShortDesc);
            }
            if (currentValues.coursePrice !== course.price && data.coursePrice) {
                formData.append("price", data.coursePrice);
            }
            if (currentValues.courseTags.toString() !== course.tag.toString() && data.courseTags) {
                formData.append("tag", JSON.stringify(data.courseTags));
            }
            if (currentValues.courseBenefits !== course.whatYouWillLearn && data.courseBenefits) {
                formData.append("whatYouWillLearn", data.courseBenefits);
            }
            if (currentValues.courseCategory._id !== course.category._id && data.courseCategory) {
                formData.append("category", data.courseCategory);
            }
            if (currentValues.courseRequirements.toString() !== course.instructions.toString() && data.courseRequirements) {
                formData.append("instructions", JSON.stringify(data.courseRequirements));
            }
            if (currentValues.courseImage !== course.thumbnail && data.courseImage) {
                formData.append("thumbnailImage", data.courseImage);
            }

            // Check if formData has any entries
            if (formData.entries().next().done) {
                toast.error("No changes made to the form");
                return;
            }

            setLoading(true);
            const result = await editCourseDetails(formData, token);
            setLoading(false);
            if (result) {
                dispatch(setStep(2));
                dispatch(setCourse(result));
            }
        } else {
            toast.error("No changes made to the form");
        }
    } else {
        // Form data for creating a new course
        if (data.courseTitle) formData.append("CourseName", data.courseTitle);
        if (data.courseShortDesc) formData.append("CourseDescription", data.courseShortDesc);
        if (data.coursePrice) formData.append("Price", data.coursePrice);
        if (data.courseTags) formData.append("Tag", JSON.stringify(data.courseTags));
        if (data.courseBenefits) formData.append("WhatYouWillLearn", data.courseBenefits);
        if (data.courseCategory) formData.append("Category", data.courseCategory);
        formData.append("Status", COURSE_STATUS.DRAFT);
        if (data.courseRequirements) formData.append("Instructions", JSON.stringify(data.courseRequirements));
        if (data.courseImage) formData.append("ThumbnailImage", data.courseImage);

        setLoading(true);
        const result = await addCourseDetails(formData, token);
        setLoading(false);
        if (result) {
            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
    }
};


  



  return (
   <form
   onSubmit={handleSubmit(onSubmit)}
   className="space-y-8 rounded-md border-1px border-richblack-700 bg-richblack-800 p-6">
   

   <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseTitle">
          Course Title <sup className="text-pink-400">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
           className="form-style w-full py-2 px-3 bg-slate-900 rounded-md  text-white border border-solid border-white focus:outline-none focus:border-amber-300"
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-400">
            Course title is required
          </span>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
          Course Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full py-2 px-3 text-white bg-slate-900 rounded-md border border-solid border-white focus:outline-none focus:border-amber-300"
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Description is required
          </span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="coursePrice">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style w-full py-2 pl-12 text-white bg-slate-900 rounded-md border border-solid border-white focus:outline-none focus:border-amber-300"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Price is required
          </span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseCategory">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("courseCategory", { required: true })}
          defaultValue=""
          id="courseCategory"
          className="form-style w-full py-2 pl-3 text-white bg-slate-900 rounded-md border border-solid border-white focus:outline-none focus:border-amber-300"
        >
          <option value="" disabled >
            Choose a Category
          </option>
          {!loading &&
            courseCategories?.map((category, indx) => (
              <option key={indx} value={category}>
                {category}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Category is required
          </span>
        )}
      </div>
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

<Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full py-2 px-3 text-white bg-slate-900 rounded-md border border-solid border-white focus:outline-none focus:border-amber-300"
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Benefits of the course is required
          </span>
        )}
      </div>
      <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />
      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Continue Wihout Saving
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>


   </form>
  )
}

export default CourseInformation
