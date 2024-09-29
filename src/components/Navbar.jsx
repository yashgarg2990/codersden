import React from 'react'


import { Link , NavLink } from 'react-router-dom'
import {Navlinks} from "../Data/navbar-links"
import { useSelector , useDispatch } from 'react-redux'
import { ACCOUNT_TYPE } from "../utils/constants"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { apiConnector } from '../services/apiconnector'
import { categories } from '../services/apis'
import { useState ,useEffect } from 'react'
import ProfileDropdown from './auth/ProfileDropdown'


function Navbar() {
  const  token  = useSelector((state) => state.auth.token)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const [loading, setLoading] = useState(false);
  const [subLinks, setSubLinks] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        console.log("printing  navbar categories ----" , res.data.data)
       // Log the fetched data
        setSubLinks(res.data.data);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    console.log('subLinks state updated:', subLinks); // Log whenever subLinks state changes
  }, [subLinks]);

  return (
    <div className='flex items-center  w-full justify-center  h-14 border-b-[1px] border-b-richblack-500 '>
        <div className='flex w-10/12 max-w-content items-center justify-between'>
         <div>
         <Link to="/">
           <p className='font-mono text-white font-bold text-3xl'>Coders Den</p>
         </Link>
         </div>
         
      
            <nav  className="hidden md:block"  >
                <ul className='flex items-center  w-full gap-x-4 text-richblack-25 '>
                    {
                      Navlinks.map((link ,index)=>(
                         <li key={index}>
                            {
                                link.title ==='Catalog' ? (
                                <NavLink to={link?.path}
                                >
                                <div className='group relative flex items-center gap-1'>
                                   <p>{link.title}</p>
                                   <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : (subLinks && subLinks.length) ? (
                          <>
                              
                              {subLinks?.map((subLink, i) => (
                                  <Link
                                    to={`/catalog/${subLink.split(" ").join("-")}`}
                                    className="rounded-lg bg-transparent py-2 pl-4 hover:bg-richblack-50"
                                    key={i}
                                  >
                                    <p>{subLink}</p>
                                  </Link>
                                ))}
        

                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                                  </div>
                                </NavLink>
                                ) : (
                                    <NavLink
                                                to={link?.path}
                                            className={({ isActive }) =>
                                                 isActive ? 'text-yellow-300' : 'text-richblack-25' } >
                                        <p>
                                            {link.title}
                                        </p>
                                    </NavLink>
                                )
                            }
                        </li>
                      ))
                    } 

                    </ul>

            </nav>
        
         <div className='hidden items-center gap-x-4 md:flex'>
             {
              user && (
                <ProfileDropdown/>
              )
             }
           {
            user && user?.account_type!== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
  )
           }
                     {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-5 hover:scale-90 transition duration-400  ease-in-out">
  Login
</button>

            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-5 hover:scale-90 transition duration-400 ease-in-out">
                Sign up
              </button>
            </Link>
          )}
          

         </div>
         <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
        </div>
      
    </div>
  )
}

export default Navbar

