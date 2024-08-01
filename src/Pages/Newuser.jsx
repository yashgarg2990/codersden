import React, { useState } from 'react';
import Input from '../components/Input';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Numberfield from '../components/Numberfield';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import { setSignupData  , setdatadone} from '../slices/authSlice';
import { useDispatch } from 'react-redux';
import { sendOtp } from '../services/operations/authAPI';
function Newuser() {
  const dispatch   = useDispatch();
  const [formData, setFormData] = useState({
    selected: 'Student',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',

  });
  const [mobileno , setMobileNo] = useState();
  const [passtype, setPasstype] = useState('password');
  const [confpasstype, setconfpasstype] = useState('password');
 
  const { selected, firstName, lastName, email, password, confirmPassword, gender } = formData;
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const navigate = useNavigate();
  
  const togglePasswordVisibility = () => {
    setPasstype(passtype === 'text' ? 'password' : 'text');
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setconfpasstype(confpasstype === 'text' ? 'password' : 'text');
  };
  
  const submithandler = async (e) => {
    e.preventDefault();
    const data = {...formData , mobileno}
    console.log(data);
    dispatch(sendOtp(email , navigate))
    dispatch(setdatadone(true));
    dispatch(setSignupData(data))
    navigate('/verify-mail')
    


      
  };

  return (
    <div className='w-full flex flex-row justify-start md:ml-6 sm: ml-1 '>
      <div className='2xl:w-[43%] lg:w-[43%] md:w-3/5 sm:w-full/12 flex flex-col 2xl:mb-12 mt-6 gap-y-6'>
        <form onSubmit={submithandler} className='w-full md:px-4 md:pt-4'>
          <div className='md:w-full sm:w-10/12'>
            <p className='2xl:text-6xl lg:text-5xl md:text-5xl sm:text-5xl text-white font-semibold'>
              Join the Community of ambitious learners
            </p>
          </div>
          <div className='md:w-full sm:w-10/12 2xl:text-base lg:text-xs md:text-xs sm:text-xs font-semibold text-slate-300 '>
            Build Your Skills for today, tomorrow and beyond
          </div>
          <div className="mt-5 rounded-full px-2 py-2 bg-slate-700 flex flex-row gap-x-3 max-w-fit">
            <div>
              <input
                type="radio"
                id="student"
                name="selected"
                value="Student"
                checked={selected === 'Student'}
                onChange={handleChange}
                className="hidden"
              />
              <label
                htmlFor="student"
                className={`px-4 py-2 font-semibold 2xl:text-lg text-sm rounded-full cursor-pointer transition duration-900 ease-in-out transform ${
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
                name="selected"
                value="Instructor"
                checked={selected === 'Instructor'}
                onChange={handleChange}
                className="hidden"
              />
              <label
                htmlFor="Instructor"
                className={`px-4 py-2 text-sm 2xl:text-lg font-semibold rounded-full cursor-pointer transition duration-900 ease-in-out transform ${
                  selected === 'Instructor' ? 'bg-slate-900 text-white scale-110' : 'bg-slate-700 text-white '
                }`}
              >
                Instructor
              </label>
            </div>
          </div>
          <div className='md:flex md:flex-row flex flex-col md:w-10/12 sm:w-[60%] mt-3 justify-between'>
            <div className='md:w-[45%] sm:w-[50%] '>
              <Input htmlFor={"firstName"} labelname={"First Name"} typename={"text"} id={"firstName"} name={"firstName"} valuename={firstName} setfunction={handleChange} placeholder={"first name"} />
            </div>
            <div className='md:w-[45%] sm:w[50%] '>
              <Input htmlFor={"lastName"} labelname={"Last Name"} typename={"text"} id={"lastName"} name={"lastName"} valuename={lastName} setfunction={handleChange} placeholder={"last name"} />
            </div>
          </div>
          <div className='md:w-10/12 sm:w-[60%]'>
            <Input htmlFor={"email"} labelname={"Email"} typename={"email"} id={"email"} name={"email"} valuename={email} setfunction={handleChange} placeholder={"email"} />
          </div>
          <div className='md:flex md:flex-row flex flex-col md:w-10/12 sm:w-[60%] mt-3 justify-between'>
            <div className='md:w-[45%] sm:w-[50%] '>
              <label htmlFor="password" className="block text-xs 2xl:text-lg font-medium text-white mb-1">
                Password <span className="text-red-600">*</span>
              </label>
              <div className='flex flex-row w-full '>
                <div className='w-11/12 '>
                  <input
                    type={passtype}
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    className="px-3 py-2 bg-slate-800 rounded-md text-white text-sm font-medium 2xl:text-base w-full"
                    style={{ border: 'none' }}
                    placeholder="Enter your Password"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className='flex justify-center items-center -translate-x-6 '>
                  {passtype === 'password' ? (
                    <FaRegEyeSlash className='text-white cursor-pointer' onClick={togglePasswordVisibility} />
                  ) : (
                    <FaRegEye className='text-white cursor-pointer' onClick={togglePasswordVisibility} />
                  )}
                </div>
              </div>
            </div>
            <div className='md:w-[45%] sm:w-[50%] '>
              <label htmlFor="confirmPassword" className="block text-xs 2xl:text-base font-medium text-white mb-1">
                Confirm Password <span className="text-red-600">*</span>
              </label>
              <div className='flex flex-row w-full '>
                <div className='w-11/12 '>
                  <input
                    type={confpasstype}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    className="px-3 py-2 bg-slate-800 rounded-md text-white text-sm font-medium 2xl:text-base w-full"
                    style={{ border: 'none' }}
                    placeholder="Confirm Your Password"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className='flex justify-center items-center -translate-x-6 '>
                  {confpasstype === 'password' ? (
                    <FaRegEyeSlash className='text-white cursor-pointer' onClick={toggleConfirmPasswordVisibility} />
                  ) : (
                    <FaRegEye className='text-white cursor-pointer' onClick={toggleConfirmPasswordVisibility} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='md:w-10/12 sm:w-[60%]'>
            <Numberfield htmlFor={"mobileno"} labelname={"Mobile No"} typename={"number"} id={"mobileno"} name={"mobileno"} value={mobileno} setfunction={setMobileNo} placeholder={"Mobile Number"} />
          </div>
          <div className='md:w-10/12 sm:w-[60%]'>
            <label htmlFor="gender" className="block text-xs 2xl:text-lg font-medium text-white mb-1">
              Gender <span className="text-red-600">*</span>
            </label>
            <select id="gender" name="gender" className='px-3 py-2 border bg-slate-800 rounded-md text-white font-medium text-sm 2xl:text-base w-full'
              style={{ border: 'none' }} onChange={handleChange} value={gender}>
              <option value="" disabled className='py-3'>Select Gender</option>
              <option value="Male" className='py-3'>Male</option>
              <option value="Female" className='py-3'>Female</option>
            </select>
          </div>
        
          <div className='w-4/5 mt-8 mb-16'>
            <button type="submit" className="bg-yellow-300 text-black hover:bg-yellow-400 text-center 2xl:text-lg md:text-sm sm:text-sm lg:text-sm px-6 py-2 rounded-md font-bold w-full">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Newuser;
