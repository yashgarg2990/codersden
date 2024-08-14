import React from 'react'
import { FaCheck } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import CourseInformation from './CourseInformation'


function RenderSteps() {
    const {step}  = useSelector((state) => state.course )
    const steps = [
        {
          id: 1,
          title: "Course Information",
        },
        {
          id: 2,
          title: "Course Builder",
        },
        {
          id: 3,
          title: "Publish",
        },
      ]

     return(
        <>
          <div className='relative mb-2 flex w-full justify-center'>
            {steps.map((item)=>(
                <>
                 <div className='flex flex-col items-center' key={item.id}>
                    <button 
                    className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                        step === item.id ? "border-yellow-300 bg-yellow-900 text-yellow-300" : 
                        "border-richblack-700 bg-richblack-800 text-richblack-300" } ${ step > item.id &&  "bg-yellow-300  text-black"}
                    `} 
                    >
                        {step > item.id ? (
                  <FaCheck className="font-bold text-richblack-900" />
                ) : (
                  item.id
                )}

                    </button>
                    <p
                className={`text-sm ${
                  step >= item.id ? "text-richblack-5" : "text-richblack-500"
                }`}
              >
                {item.title}
              </p>
                 </div>
                 {item.id !== steps.length && (
              <>
                <div
                  className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
                  step > item.id  ? "border-yellow-50" : "border-richblack-500"
                } `}
                ></div>
              </>
            )}
                </>
            ))}  
          </div>

          {
            step===1 && <CourseInformation/>
          }

          

          
        </>

     )

  
}

export default RenderSteps
