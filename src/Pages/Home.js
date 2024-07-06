import React from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Banner from "../assets/media/homepage-video.mp4"
 import "./home.css"

function Home() {
  return (
    <div>
      {/* Section 1 */}
      <div className='  flex flex-col items-center mx-auto w-10/12 '>
        {/* Image se upar wala part */}
        <div className='flex flex-col mx-auto items-center  gap-y-2 text-slate-200'>
          <Link to="/signup" className="group">
            <div className='flex flex-row bg-slate-800 rounded-full hover:scale-105 duration-300 px-5 py-2 items-center gap-x-1 mt-16 group-hover:bg-slate-700 '>
              <p className="group-hover:text-slate-200 text-sm font-medium">Become an Instructor</p>
              <FaArrowRightLong className="group-hover:text-slate-200" />
            </div>
          </Link>
          <div  className=' flex flex-row justify-center'>
            <p className="text-2xl md:text-3xl lg:text-4xl font-semibold mt-4  text-center ">
              Empower Your Future With <span className='text-2xl md:text-3xl lg:text-4xl font-semibold mt-4 text-cyan-400'>Coding Skills</span>
            </p>

          </div>
          <div className=' flex flex-row justify-center w-[80%] mt-0'>
          <p className="text-xs  md:text-sm lg:text-base font-medium mt-0 text-center  text-slate-300">
  Learn various technologies at your own pace and convenience, from anywhere in the world. 
  Explore cutting-edge courses designed to fit your schedule and career goals. 
  Join a global community of learners mastering skills for the digital age.
          </p>
          </div>
          <div className='flex flex-row justify-center w-[80%] mt-7 gap-x-16 '>
              <Button active={true} linkto={"/signup"}>Learn More</Button>
              <Button active={false} linkto={"/contactus"}>Book A Demo</Button>
          </div>
        </div>
        <div className="relative mt-8 w-3/5 mb-8 h-auto ">
        <video muted loop autoPlay className="banner">
          <source src={Banner} type="video/mp4" />
        </video>
      </div>
      </div>
    </div>
  );
}

export default Home;
