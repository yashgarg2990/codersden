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
            result = response.data.courses
            toast.success("Courses Fetched Successfully")
        }
       
    }
    catch(error) {
         toast.error("Cannot get the Courses")
    }
  
    toast.dismiss(toastId)
    return result
}