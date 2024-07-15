import React from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Banner from "../assets/media/homepage-video.mp4"
 import "./home.css"
 import Contentcard from '../components/Homecomp/Contentcard';
 import Codeblocks from '../components/Homecomp/Codeblocks';
 import Colourtext from '../components/Homecomp/Colourtext';
 import bgimage from "../assets/media/wire-mesh-background.webp"
import Timeline from "../components/Homecomp/Timeline"
 import teacher from "../assets/media/teacher.webp"
import Footers from '../components/Footers';
function Home() {
  const htmlCode = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>My First Web Page</title>
  </head>
  <body>
      <h1>Welcome to My Website</h1>
      <p>This is a paragraph of text on my first web page.</p>
  </body>
  </html>`
  return (
    <div className=' flex flex-col items-center w-full'>
      {/* Section 1 */}
      <div className='  flex flex-col overflow-x-hidden items-center   '>
        {/* Image se upar wala part */}
        <div className='flex flex-col mx-auto items-center  gap-y-2 text-slate-200'>
          <Link to="/signup" className="group">
            <div className='flex flex-row bg-slate-800 rounded-full hover:scale-105 duration-300 px-5 py-2 items-center gap-x-1 mt-16 group-hover:bg-slate-700 '>
              <p className="group-hover:text-slate-200 text-sm font-medium">Become an Instructor</p>
              <FaArrowRightLong className="group-hover:text-slate-200" />
            </div>
          </Link>
          <div  className=' flex flex-row justify-center'>
            <p className="text-xl md:text-3xl lg:text-4xl font-semibold mt-4  text-center ">
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
        <div className="relative w-3/5 mt-5 mb-5 h-auto   md:mt-8 md:w-3/5 md:mb-8 md:h-auto lg:mt-8 lg:w-3/5 lg:mb-8 lg:h-auto  ">
        <video muted loop autoPlay className="banner">
          <source src={Banner} type="video/mp4" />
        </video>
      </div>
      <div className=' flex flex-col mx-4  md:flex md:flex-row md:justify-center md:gap-x-60 md:mt-5  lg:flex lg:flex-row lg:justify-between lg:gap-x-60 lg:mt-5 lg:w-10/12'>
        <div className=' w-[100%] md:w-[35%] lg:[35%]'>
          <Contentcard 
          heading = {<>
           "Unlock your <span className='text-cyan-400'>coding potential</span> with our online courses"
          </>}
          subheading ={"Our courses are designed and taught by industry experts who have years of experinece in coding and are passionate about sharing their knowledge with you "}
          ctnbutton1 ={
            {
              button : "try it yourself ",
              active : true ,
              linkto : "/signup"

            }
          }
          ctnbutton2 ={
            {
              button : " learn more  ",
              active : false  ,
              linkto : "/login"

            }
          }
           />


        </div>
       
        <div className=' code-card w-[100%] md:w-[30%] lg:w-[30%] bg-slate-700 bg-opacity-5 ' >

           <Codeblocks  code ={`<<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport">\n<title>My First Web Page</title>\n</head>\n<body>\n<h1>hello world</h1>\n<p>Learn coding by experts</p>\n</body>\n</html>>`} />
          
        </div>
      </div>
      <div className='flex flex-col mx-4  mt-4 md:flex md:flex-row md:justify-center md:gap-x-60 md:mt-5  lg:flex lg:flex-row lg:justify-between lg:gap-x-60 lg:mt-20 lg:w-10/12 '>
       
       
      <div className='code-card-2 w-[30%] bg-slate-700 bg-opacity-5 hidden md:block'>
    <Codeblocks code={`<<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport">\n<title>My First Web Page</title>\n</head>\n<body>\n<h1>hello world</h1>\n<p>Learn coding by experts</p>\n</body>\n</html>>`} />
</div>
        <div className='  w-[100%] mb-5 md:w-[35%] lg:[35%]'>
          <Contentcard 
          heading={
            <>
              Start <span className='text-cyan-400'> coding in Seconds</span>
            </>
          }
  
          subheading ={"Go Ahead and take your first step towards your journey of becoming a professional programmer  "}
          ctnbutton1 ={
            {
              button : "Go Ahead ",
              active : true ,
              linkto : "/signup"

            }
          }
          ctnbutton2 ={
            {
              button : " learn more  ",
              active : false  ,
              linkto : "/login"

            }
          }
           />


        </div>
      </div>
      </div>

      {/* Srction 2 */}
      <div className=  'bg-slate-50 overflow-x-hidden text-slate-800 flex flex-col  w-full mb-6'>
        
          <div className=' sec-2bg flex flex-row items-center justify-center gap-x-24  '>
          <div>
            <Button active={true} linkto={"/signup"}> 
            Explore Full Catalog
            </Button>
          </div>
          <div>
            <Button active={false} linkto={"/signup"}> 
           Learn More
            </Button>
          </div>
        
       
          
          </div>
          <div className='flex flex-col items-center mt-10'>
          <div className='flex flex-col items-center gap-y-10 mb-10 w-9/12 '>
            <div className=' flex flex-col items-center gap-y-5  md:flex md:flex-row md:justify-between md:gap-x-12  lg:flex lg:flex-row lg:justify-between lg:gap-x-12'>
              <div className=' w-[100%] md:w-[30%] lg:w-[30%]'>
                <p className='text-3xl  text-slate-800 font-bold'>Get skills you need for a <span className='text-cyan-500'>job that is in demand</span> </p>
              </div>
              <div className=' w-[100%] md:w-[40%] lg:w-[40%]'>
                  <p className='font-semibold'> Acquire Skills on your terms. For being competitive in todays's modern world you need more than ordinary something exceptional </p>
              </div>
              

            </div>
               <div>
                <Button active={true} linkto={"/signup"}>
                  Learn More 
                </Button>
               </div>
        
          </div>
          <div className='w-9/12 mb-12'>
          <Timeline/>
          </div>
         
          </div>
      </div>
      {/* Section 3 */}
      <div className=' overflow-x-hidden flex flex-col items-center gap-y-8 mt-8 md:flex md:flex-row lg:flex md:gap-x-8 lg:flex-row lg:justify-center lg:items-center lg:gap-x-8 mb-12'>
      <div className=' sm:w-[75%] mx-6 '>
    <img src={teacher} alt="Teacher" className="w-full h-auto"/>
  </div>
  <div className='flex flex-col mx-6  gap-y-4'>
    <div>
      <p className='lg:text-3xl md:text-2xl text-xl font-bold text-slate-100 w-2 '> Become <span className='text-cyan-400 font-bold'> Instructor</span></p>
    </div>
    <div>
      <p className='text-slate-400 text-xs md:text-sm lg:text-sm  w-[75%]'>Become a instructor and share your knowledge with the future of our nation </p>
    </div>
    <div>
      <Button active={true} linkto={"/signup"}>
      Start teaching today
      </Button>
    </div>
  </div>
</div>
    <div className='w-[100%] overflow-x-hidden'>
      <Footers/>
    </div>
    </div>
  );
}

export default Home;
