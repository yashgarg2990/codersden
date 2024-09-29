import { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserEnrolledCourses } from "../../services/operations/ProfileApi";

function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const [fetch, setFetch] = useState(false);

  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token);
      console.log("Enrolled courses ka result", res);
      setEnrolledCourses(res);
  
      // Log the enrolledCourses right after setting the state
      console.log("EnrolledCourses after setting:", res);
  
      setFetch(true);
    } catch (error) {
      console.log("Could not fetch enrolled courses.");
      setFetch(true); // Ensure UI reflects the error state
    }
  };
  

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  

  return (
    <div>
      <div className="text-3xl text-richblack-50">Enrolled Courses</div>
      {!fetch ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses || enrolledCourses.length === 0 ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You have not enrolled in any course yet.
        </p>
      ) : (
        <div className="my-8 text-richblack-5">
          {/* Headings */}
          <div className="flex rounded-t-lg bg-richblack-500 ">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>
          {/* Course Names */}
          {enrolledCourses.map((Course, i, arr) => (
            <div
              className={`flex items-center border border-richblack-700 ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
              key={i}
            >
              <div
                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() => {
                  navigate(
                    `/view-course/${Course?._id}/section/${Course.CourseContent?.[0]?._id}/sub-section/${Course.CourseContent?.[0]?.SubSection?.[0]?._id}`
                  );
                }}
              >
                <img
                  src={Course.Thumbnail}
                  alt="course_img"
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{Course.CourseName}</p>
                  <p className="text-xs text-richblack-300">
                    {Course.CourseDescription.length > 50
                      ? `${Course.CourseDescription.slice(0, 50)}...`
                      : Course.CourseDescription}
                  </p>
                </div>
              </div>
              <div className="w-1/4 px-2 py-3">{Course?.TotalDuration}</div>
              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                <p>Progress: {Course.ProgressPercentage || 0}%</p>
                <ProgressBar
                  completed={Course.ProgressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
}

export default EnrolledCourses;
