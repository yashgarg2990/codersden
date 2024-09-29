import {toast} from "react-hot-toast"
import {setLoading  , setProfile} from "../../slices/profileSlice"
import {apiConnector} from "../apiconnector"
import { profileEndpoints } from "../apis"
import { logout } from "./authAPI"

const {GET_USER_DETAILS_API , GET_USER_ENROLLED_COURSES_API , GET_INSTRUCTOR_DATA_API} = profileEndpoints

export async function getUserEnrolledCourses(token) {
    
    const toastId =  toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector(
            "GET" , 
            GET_USER_ENROLLED_COURSES_API ,
            null , 
            {
                Authorization : `Bearer ${token}`
            }
        )

        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        else if(response.data.success) {
            console.log(response)
            result = response.data.data
            toast.success("Courses Fetched Successfully")
        }
       
    }
    catch(error) {
         toast.error("Cannot get the Courses")
    }
  
    toast.dismiss(toastId)
    return result
}

export function getUserDetails(token, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
          Authorization: `Bearer ${token}`,
        })
        console.log("GET_USER_DETAILS API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        const userImage = response.data.data.image
          ? response.data.data.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
        dispatch(setProfile({ ...response.data.data, image: userImage }))
      } catch (error) {
        dispatch(logout(navigate))
        console.log("GET_USER_DETAILS API ERROR............", error)
        toast.error("Could Not Get User Details")
      }
      toast.dismiss(toastId)
      dispatch(setLoading(false))
    }
  }
  
export async function getInstructorData(token) {
    const toastId = toast.loading("Loading...");
    let result = [];
    try{
      const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, 
      {
        Authorization: `Bearer ${token}`,
      })
  
      console.log("GET_INSTRUCTOR_API_RESPONSE", response);
      result = response?.data?.courses
  
    }
    catch(error) {
      console.log("GET_INSTRUCTOR_API ERROR", error);
      toast.error("Could not Get Instructor Data")
    }
    toast.dismiss(toastId);
    return result;
  }