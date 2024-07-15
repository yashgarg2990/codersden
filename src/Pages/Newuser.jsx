import React from 'react'
import { useState } from 'react';
import Input from '../components/Input';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Numberfield from '../components/Numberfield';
import axios from 'axios';
import {Link , useNavigate} from 'react-router-dom'
import home2 from "../assets/media/home-2.jpg"
function Newuser() {
    const [selected, setSelected] = useState('Student');
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Email, setEmail] = useState('');
    const [MobileNo ,setnumber] = useState()
    const[Password ,setPassword] =useState("")
    const [passtype, setPasstype] = useState('password');
    const [confpasstype , setconfpasstype] =useState("password")
    const[confirmPassword ,setconfirmPassowrd]=useState("")
    const [Gender , setGender] = useState("")
    const[OTP ,Setotp] = useState()
    const navigate = useNavigate();
   
    const togglePasswordVisibility = () => {
        setPasstype(passtype === 'text' ? 'password' : 'text');
      };
      const toggleConfirmPasswordVisibility = () => {
        setconfpasstype(confpasstype === 'text' ? 'password' : 'text')
      };
      const submithandler =async (e) =>{
        e.preventDefault()
        try{
           const response = await axios.post('http://localhost:4000/api/v1/auth/signup',{
            FirstName:FirstName,
            LastName:LastName,
            Email:Email,
            Mobile:MobileNo,
            Password:Password,
            Gender:Gender,
            otp:OTP,
            ConfirmPassword  : confirmPassword, 
            AccountType:selected
           })
           if (response.data.success) {
            navigate('/');  // Redirect to home page or desired route on success
          } else if (response.data.success === false) {
            window.alert(`Submission failed: ${response.data.message}`);
          }
        }
        catch(error){
            console.log(error)
            window.alert('An error occured',error)
        }
      }

  return (
    <div className='w-full flex flex-row justify-start md:ml-6 sm: ml-1 '>
        <div className='  2xl:w-[43%] lg:w-[43%] md:w-3/5 sm:w-full/12 flex flex-col 2xl:mb-12 mt-24 gap-y-6'>
         <form onSubmit={submithandler} className='w-full md:px-4 md:pt-4'>
         <div className='md:w-full sm:w-10/12'>
            <p className=' 2xl:text-6xl lg:text-5xl md:text-5xl sm:text-5xl text-white font-semibold'>
              Join the Community of ambitious learners
            </p>
          </div> 
          <div className=' md:w-full sm:w-10/12 2xl:text-base lg:text-xs md:text-xs sm:text-xs font-semibold text-slate-300 '>
               Build Your Skills for today, tommorow and beyond
          </div> 
          <div className="mt-5 rounded-full px-2 py-2 bg-slate-700 flex flex-row gap-x-3 max-w-fit">
      <div>
        <input
          type="radio"
          id="student"
          name="role"
          value="Student"
          checked={selected === 'Student'}
          onChange={() => setSelected('Student')}
          className="hidden"
        />
        <label
          htmlFor="student"
          className={`px-4 py-2  font-semibold 2xl:text-lg text-sm rounded-full cursor-pointer transition duration-900 ease-in-out transform ${
            selected === 'Student' ? 'bg-slate-900 text-white scale-110' : 'bg-slate-700 text-white '
          }`}
        >
          Student
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="Instructor"
          name="role"
          value="Instructor"
          checked={selected === 'Instructor'}
          onChange={() => setSelected('Instructor')}
          className="hidden"
        />
        <label
          htmlFor="Instructor"
          className={`px-4 py-2 text-sm  2xl:text-lg font-semibold rounded-full cursor-pointer transition duration-900 ease-in-out transform ${
            selected === 'Instructor' ? 'bg-slate-900 text-white scale-110' : 'bg-slate-700 text-white '
          }`}
        >
          Instructor
        </label>
      </div>
    </div>
        <div className=' md:flex md:flex-row flex flex-col md:w-10/12 sm:w-[60%]  mt-3 justify-between '>
            <div className='md:w-[45%] sm:w-[50%] '>
             <Input htmlFor={"firstname"} labelname={"First Name"} typename={"text"} id={"firstname"} name={"firstname"} valuename={FirstName} setfunction={setFirstName} placeholder={"first name"}/>
            </div>
            <div className='md:w-[45%] sm:w[50%] '>
             <Input htmlFor={"lastname"} labelname={"Last Name"} typename={"text"} id={"lastname"} name={"lastname"} valuename={LastName} setfunction={setLastName} placeholder={"last name"}/>
            </div>
        </div>
        <div className='md:w-10/12 sm:w-[60%]'>
            <Input htmlFor={"email"} labelname={"Email"} typename={"email"} id={"email"} name={"email"} valuename={Email} setfunction={setEmail} placeholder={"email"}/>

        </div>
        <div className=' md:flex md:flex-row flex flex-col md:w-10/12 sm:w-[60%]  mt-3 justify-between '>
            <div className='md:w-[45%] sm:w-[50%] '>
            <label htmlFor="Password" className="block text-xs 2xl:text-lg font-medium text-white  mb-1">
          Password <span className="text-red-600">*</span>
        </label>
        <div className='flex flex-row w-full '>
          <div className='w-11/12 '>
            <input
              type={passtype}
              id="Password"
              name="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-2  bg-slate-800 rounded-md text-white text-sm font-medium 2xl:text-base w-full"
              style={{ border: 'none' }}
              placeholder="Enter your Password"
              autoComplete="off"
              required
            />
          </div>
          { <div className='flex justify-center items-center -translate-x-6 '>
            {passtype === 'password' ? (
              <FaRegEyeSlash className='text-white cursor-pointer' onClick={togglePasswordVisibility} />
            ) : (
              <FaRegEye className='text-white cursor-pointer' onClick={togglePasswordVisibility} />
            )}
          </div> }
        </div>
            </div>
             <div className='md:w-[45%] sm:w-[50%] '>
            <label htmlFor="confirm" className="block text-xs 2xl:text-base font-medium text-white  mb-1">
        Confirm Password <span className="text-red-600">*</span>
        </label>
        <div className='flex flex-row w-full '>
          <div className='w-11/12 '>
            <input
              type={confpasstype}
              id="confirm"
              name="confirm"
              value={confirmPassword}
              onChange={(e) => setconfirmPassowrd(e.target.value)}
              className="px-3 py-2  bg-slate-800 rounded-md text-white text-sm font-medium 2xl:text-base w-full"
              style={{ border: 'none' }}
              placeholder="Confirm Your Password"
              autoComplete="off"
              required
            />
          </div>
          { <div className='flex justify-center items-center -translate-x-6 '>
            {confpasstype === 'password' ? (
              <FaRegEyeSlash className='text-white cursor-pointer' onClick={toggleConfirmPasswordVisibility} />
            ) : (
              <FaRegEye className='text-white cursor-pointer' onClick={toggleConfirmPasswordVisibility} />
            )}
          </div> }
        </div>
            </div>
        </div>

        <div className='md:w-10/12 sm:w-[60%]'>
            <Numberfield htmlFor={"mobile"} labelname={"Mobile No"} typename={"number"} id={"mobile"} name={"mobile"} valuename={MobileNo} setfunction={setnumber} placeholder={"Mobile Number"}/>

        </div>
        <div  className='md:w-10/12 sm:w-[60%]'>
        <label htmlFor="gender" className="block text-xs 2xl:text-lg font-medium text-white mb-1">
          Gender <span className="text-red-600">*</span>
        </label>
        <select id="gender" name="gender" className='px-3 py-2  border bg-slate-800 rounded-md text-white  font-medium text-sm 2xl:text-base w-full'
        style={{ border: 'none' }} onChange={(e) => setGender(e.target.value)}>
    <option value="" disabled selected>Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
  </select>

        </div>
        <div className='md:w-10/12 sm:w-[60%]'>
            <Numberfield htmlFor={"otp"} labelname={"OTP"} typename={"number"} id={"otp"} name={"otp"} valuename={OTP} setfunction={Setotp} placeholder={"Enter the OTP you got "}/>

        </div>
        <div className='w-4/5 mt-8 mb-16'>
      <button type="submit"  className=" bg-yellow-300 text-black  hover:bg-yellow-400 text-center 2xl:text-lg md:text-sm sm:text-sm lg:text-sm px-6 py-2  rounded-md font-bold w-full">
          Login
        </button>
      </div>

         </form>
        </div>
        <div className='hidden lg:flex items-center'>
    <img src={home2} />
</div>
      
    </div>
  )
}

export default Newuser
