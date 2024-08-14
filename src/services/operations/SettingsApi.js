import { apiConnector } from "../apiconnector"
import { settingsEndpoints } from "../apis" 
import toast from "react-hot-toast"
import { setProfile } from "../../slices/profileSlice"
import { setLoading } from "../../slices/authSlice"

const {UPDATE_DISPLAY_PICTURE_API , UPDATE_PROFILE_API} = settingsEndpoints
export function UpdateProfilePic( token , formdata){
    return async function(dispatch){ 
        setLoading(true);
        try{
            const response  =await apiConnector("POST" , UPDATE_DISPLAY_PICTURE_API , 
                formdata,
                {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${token}`,
                }
             )
            if(response.status === 200){
                toast.success("Profile Picture Updated Successfully")
                console.log(response)
                 dispatch(setProfile(response.data.user))
            }

        }
        catch(error){
            console.log(error)
            toast.error("Cannot change Image , try again")
        }
        setLoading(false)
    }
}

export function updateProfile(token, formData) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      try {
        const response = await apiConnector("POST", UPDATE_PROFILE_API, formData, {
          Authorization: `Bearer ${token}`,
        })
        console.log("UPDATE_PROFILE_API API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        
        const userImage = response.data.updatedUserDetails.Image
          ? response.data.updatedUserDetails.Image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.FirstName} ${response.data.updatedUserDetails.LastName}`
        dispatch(
          setProfile({ ...response.data.updatedUserDetails, image: userImage })
        )
        toast.success("Profile Updated Successfully")
      } catch (error) {
        console.log("UPDATE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Update Profile")
      }
      toast.dismiss(toastId)
    }
  }