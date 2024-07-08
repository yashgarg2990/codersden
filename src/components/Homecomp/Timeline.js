import React from 'react'
import home2 from "../../assets/media/home-2.jpg"

function Timeline() {
    const timeline =[
        {
            heading : "Leadership",
            subheading : "Fully commited for your success"
        },
        {
            heading : "Responsiblity",
            subheading : "Students are always our top priority"
        },
        {
            heading : "Flexiblity",
            subheading : "The ability to switch to important skills"
        },
        {
            heading : "Solve the Problem",
            subheading : "Code your way to solution"
        },
    ]
  return (
    <div  >
      <div className=' sm:flex sm:flex-col sm:items-center sm:gap-y-40 md:flex md:flex-row md:justify-between  lg:flex lg:flex-row lg:justify-between   '>
        <div className='flex flex-col gap-y-0   w-full md:w-1/2 lg:w-1/2'>
        {timeline.map((element, index) => {
    return (
        <div key={index} className='flex flex-col md:gap-y-0 lg:gap-y-0 sm:gap-y-3'>
            <div>
                <h1 className='text-base md:text-xl lg:text-xl font-bold'>{element.heading}</h1>
            </div>
            <div>
                <p className=' text-xs md:text-sm lg:text-sm  text-slate-600 font-bold'>{element.subheading}</p>
            </div>
            {index !== timeline.length - 1 && (
                <div key={index + 1} className='rhombus bg-slate-200 hidden md:block md:h-8 md:w-2 lg:h-8 lg:w-2'></div>

            )}
        </div>
    );
})}
                              

              
        </div>
        <div className='hidden md:block w-1/2  justify-end image2'>
    <img src={home2}  />
</div>

   

      </div>
    </div>
   
  )
}

export default Timeline
