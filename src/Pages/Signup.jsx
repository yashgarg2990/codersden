import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import home2 from "../assets/media/home-2.jpg";
import Numberfield from '../components/Numberfield';
import "./home.css";

function Signup() {
  const [selected, setSelected] = useState('Student');
  const [passtype, setPasstype] = useState('password');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();  // useNavigate instead of useHistory

  const togglePasswordVisibility = () => {
    setPasstype(passtype === 'text' ? 'password' : 'text');
  };

  const submithandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/auth/login', {
        Email: email,
        Password: password,
        AccountType: selected
      });

      if (response.data.success) {
        navigate('/');  // Redirect to home page or desired route on success
      } else if (response.data.success === false) {
        window.alert(`Submission failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error('An error occurred', error);
      window.alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className='flex flex-row items-center min-h-screen'>
    <div className='  w-screen  sm:mr-auto md:mr-12'>
      <div className='flex flex-row lg:justify-center lg:content-center md:justify-center md:content-center sm:justify-center sm:content-center  items-center lg:gap-x-8 md:gap-x-0 w-full md:mx-6'>

        <div className='flex flex-col  rounded-2xl bg-slate-800 2xl:w-[40%] lg:w-[32%] sm:w-[75%] md:w-[75%] '>
        <form onSubmit={submithandler} className='w-full px-10 pt-5 pb-5 '> 
          <div>
            <p className=' 2xl:text-7xl lg:text-3xl md:text-2xl sm:text-xl text-white font-bold'>
              Welcome Back
            </p>
          </div>
          <div className='2xl:text-base lg:text-xs md:text-xs sm:text-xs font-semibold text-slate-300 '>
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
    <div className='mt-6'>
        <label htmlFor="Email" className="block text-xs 2xl:text-lg font-medium text-white mb-1">
          Email Address <span className="text-red-600">*</span>
        </label>
        <input
          type="email"
          id="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-3 py-2 2xl:py-4 border bg-slate-700 rounded-md text-white  font-medium text-sm 2xl:text-xl w-11/12 "
          style={{ border: 'none' }}
          placeholder="Enter your email address"
          autoComplete="off"
          required
        />
      </div>
      <div className='mt-4'>
        <label htmlFor="Password" className="block text-xs 2xl:text-lg font-medium text-white  mb-1">
          Password <span className="text-red-600">*</span>
        </label>
        <div className='flex flex-row w-full '>
          <div className='w-11/12 '>
            <input
              type={passtype}
              id="Password"
              name="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-2 2xl:py-4 bg-slate-700 rounded-md text-white text-sm font-medium 2xl:text-xl w-full"
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
      <div className='flex flex-row justify-end mt-2 w-11/12 '>
        <div>
            <Link to={"/reset-password"}>
            <p className='text-slate-300 text-xs 2xl:text-base '>Forgot Password?</p>
            </Link>
        </div>
      </div>
      <div className='flex w-11/12  justify-center mt-4'>
      <div className='w-4/5'>
      <button type="submit" onClick={submithandler} className=" bg-yellow-300 text-black  hover:bg-yellow-400 text-center 2xl:text-lg md:text-sm sm:text-sm lg:text-sm px-6 py-2  rounded-md font-bold w-full">
          Login
        </button>
      </div>
      
      </div>
      </form>
        </div>
        
        <div className='hidden sm:block md:-translate-x-10 image3 '>
         
        </div>
        
      </div>
        
    </div>
    </div>
  );
}

export default Signup;
