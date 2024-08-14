import React, { useEffect } from 'react';
import { useSelector, useDispatch , shallowEqual} from 'react-redux';
import { useForm } from 'react-hook-form';
import { updateProfile } from '../../../services/operations/SettingsApi';
import IconBtn from '../../IconBtn';
import { useNavigate } from 'react-router-dom';
const Genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]


function UpdateProfile() {

  const { user } = useSelector((state) => state.profile, shallowEqual);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()



  // Function to handle form submission


  const submitProfileForm = async (data) => {
    // console.log("Form Data - ", data)
    try {
      dispatch(updateProfile(token, data))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  // Effect to handle actions after successful submission


  return (
    <>
    <form onSubmit={handleSubmit(submitProfileForm)} >
      {/* Profile Information */}
      <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <h2 className="text-lg font-semibold text-richblack-5">
          Profile Information
        </h2>
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="FirstName" className="lable-style text-white">
              First Name
            </label>
            <input
              type="text"
              name="FirstName"
              id="FirstName"
              placeholder="Enter First name"
             className="form-style bg-slate-900 border border-solid border-white px-3 py-2 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-300 focus:border-amber-300"
              {...register("FirstName", { required: true })}
              defaultValue={user?.FirstName}
            />
            {errors.FirstName && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your First Name.
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="LastName" className="lable-style text-white">
              Last Name
            </label>
            <input
              type="text"
              name="LastName"
              id="LastName"
              placeholder="Enter Last name"
             className="form-style bg-slate-900 border border-solid border-white px-3 py-2 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-300 focus:border-amber-300"
              {...register("LastName", { required: true })}
              defaultValue={user?.LastName}
            />
            {errors.LastName && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your last name.
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="DateOfBirth" className="lable-style text-white">
              Date of Birth
            </label>
            <input
              type="date"
              name="DateOfBirth"
              id="DateOfBirth"
             className="form-style bg-slate-900 border border-solid border-white px-3 py-2 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-300 focus:border-amber-300"
              {...register("DateOfBirth", {
                required: {
                  value: true,
                  message: "Please enter your Date of Birth.",
                },
                max: {
                  value: new Date().toISOString().split("T")[0],
                  message: "Date of Birth cannot be in the future.",
                },
              })}
              defaultValue={user?.AdditionalDetails?.DateOfBirth}
            />
            {errors.DateOfBirth && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                {errors.DateOfBirth.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="Gender" className="lable-style text-white">
              Gender
            </label>
            <select
              type="text"
              name="Gender"
              id="Gender"
              className="form-style bg-slate-900 border border-solid border-white px-3 py-2 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-300 focus:border-amber-300"
              {...register("Gender", { required: true })}
              defaultValue={user?.AdditionalDetails?.Gender}
            >
              {Genders.map((ele, i) => {
                return (
                  <option key={i} value={ele}>
                    {ele}
                  </option>
                )
              })}
            </select>
            {errors.Gender && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your Date of Birth.
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="contactNumber" className="lable-style text-white">
              Contact Number
            </label>
            <input
              type="tel"
              name="Mobile"
              id="Mobile"
              placeholder="Enter Contact Number"
              className="form-style bg-slate-900 border border-solid border-white px-3 py-2 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-300 focus:border-amber-300"
              {...register("Mobile", {
                required: {
                  value: true,
                  message: "Please enter your Contact Number.",
                },
                maxLength: { value: 12, message: "Invalid Contact Number" },
                minLength: { value: 10, message: "Invalid Contact Number" },
              })}
              defaultValue={user?.Mobile}
            />
            {errors.Mobile && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                {errors.Mobile.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="About" className="lable-style text-white">
              About
            </label>
            <input
              type="text"
              name="About"
              id="About"
              placeholder="Enter Bio Details"
              className="form-style bg-slate-900 border border-solid border-white px-3 py-2 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-300 focus:border-amber-300"
              {...register("About", { required: true })}
              defaultValue={user?.AdditionalDetails?.About}
            />
            {errors.About && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your About.
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => {
            navigate("/dashboard/my-profile")
          }}
          className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
        >
          Cancel
        </button>
        <IconBtn type="submit" text="Save" />
      </div>
    </form>
  </>
  );
}

export default UpdateProfile;