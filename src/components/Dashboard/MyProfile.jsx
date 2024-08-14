import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../IconBtn'
import { useNavigate } from 'react-router-dom'
import {RiEditBoxLine} from 'react-icons/ri'
import { formattedDate } from '../FormatedDate'

function MyProfile() {
    const {user} = useSelector((state)=> state.profile)
    const navigate = useNavigate()
  return (
    <div >
         <h1 className='mb-14 text-3xl font-medium text-richblack-5'>My Profile </h1>
         <div className="flex  items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12  ">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.Image}
            alt={`profile-${user?.FirstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-richblack-5">
              {user?.FirstName + " " + user?.LastName}
            </p>
            <p className="text-sm text-richblack-300">{user?.Email}</p>
          </div>
        </div>
        <div>
            <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
        </div>
        
      </div>

      <div className="flex flex-col  justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 mt-8 min-w-fit">
         <div className='flex justify-between w-full'>
            <p className='text-xl text-white font-medium'>About</p>
            <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
         </div>
         <div>
            <p className='text-richblack-50 text-sm'>{user?.AdditionalDetails?.About ? user?.AdditionalDetails?.About : "Write Something About Yourself"  }</p>
         </div>
      </div>



      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">First Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.FirstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.Email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.Gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.LastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.Mobile ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.AdditionalDetails?.DateOfBirth?formattedDate(user?.AdditionalDetails?.DateOfBirth) :
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      
    </div>
  )
}

export default MyProfile
