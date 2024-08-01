import { useDispatch } from "react-redux"
import { setLoading } from "../../slices/authSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
  } = endpoints

  export function sendOtp(Email ,navigate) {
   
    return async dispatch => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", SENDOTP_API, {
          Email,
          checkUserPresent: true,
        })
        console.log("SENDOTP API RESPONSE............", response)
  
        console.log(response.data.success)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("OTP Sent Successfully")
        navigate("/verify-mail")
      } catch (error) {
        console.log("SENDOTP API ERROR............", error)
        toast.error("Could Not Send OTP")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
 

export function Signup(
  AccountType,
  FirstName,
  LastName,
  Email,
  Password,
  ConfirmPassword,
  otp,
  Gender,
  Mobile,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    let attempts = 0; // Initialize retry counter
    let success = false;

    while (attempts < 3 && !success) {
      try {
        const response = await apiConnector("POST", SIGNUP_API, {
          AccountType,
          FirstName,
          LastName,
          Email,
          Password,
          ConfirmPassword,
          Mobile,
          Gender,
          otp,
        });

        if (!response.data.success) {
          if (response.data.message === "OTP do not Match") {
            attempts += 1; // Increment attempts if OTP does not match
            if (attempts < 3) {
              toast.error(`OTP does not match. You have ${3 - attempts} attempts left.`);
              // Optionally, reset the OTP field or prompt the user to re-enter OTP
            } else {
              toast.error("Maximum attempts reached. Redirecting to signup.");
              navigate("/signup");
            }
          } else {
            throw new Error(response.data.message); // Handle other errors
          }
        } else {
          success = true; // Exit loop if signup is successful
          toast.success("Signup completed");
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
        toast.error("Signup Failed");
        navigate("/signup");
        break; // Exit loop on error
      }
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export const getPasswordResetToken = (Email, setEmailSent) => {
       return async dispatch =>{
             dispatch(setLoading(true))
             try{
                const response = await apiConnector("POST" , RESETPASSTOKEN_API ,{Email,} )
                if(!response.data.success) {

                    throw new Error(response.data.message);
                  }
            
                  toast.success("Reset Email Sent");
                  setEmailSent(true);

             }
             catch(error){
                console.log(error)
                toast.error("Failed to send email for resetting password");
             }
             dispatch(setLoading(false))
             
       }
}

export const resetPassword = (Password , ConfirmPassword  , Token) =>{
  return async dispatch =>{
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST" , RESETPASSWORD_API ,{NewPassword : Password , ConfirmPassword , Token , })
      if(!response.data.success) { 
        throw new Error(response.data.message);
      }
      toast.success("Password Reset Successfully");

    }
    catch(error){
      console.log(error)
      toast.error("Failed to Change Password");
    }
    dispatch(setLoading(false))
  }
}