import React from 'react'
import Button from '../Button'


function Contentcard({heading ,  subheading , ctnbutton1 , ctnbutton2}) {
  return (
    <div >
        <div className='flex flex-col  gap-y-2  items-center   '>
            <div>
                <p className='text-xl md:text-3xl lg:text-4xl font-semibold mt-4  text-slate-100 '>{heading}</p>
            </div>
            <div>
                <p className='text-xs md:text-sm lg:text-m font-semibold mt-2 mb-4  text-slate-400'>{subheading} </p>
            </div>
            <div className='flex flex-row gap-x-12 '> 
                <div>
                <Button active={ctnbutton1.active} linkto={ctnbutton1.linkto}  >
                    {ctnbutton1.button}
                </Button>
                </div>
                <div>
                <Button active={ctnbutton2.active} linkto={ctnbutton2.linkto}  >
                    {ctnbutton2.button}
                </Button>
                </div>
              
            </div>


        </div>
      
    </div>
  )
}

export default Contentcard

