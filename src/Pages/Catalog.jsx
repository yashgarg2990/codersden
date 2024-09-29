import React from "react";
import { useEffect , useState } from "react";
import { useParams } from "react-router-dom";
import {apiConnector} from "../services/apiconnector"
import {categories} from "../services/apis"

import { getCatalogPageData } from "../services/operations/pageAndComponentData";
 import CourseSlider from '../components/Catalog/CourseSlider';
import Course_Card from '../components/Catalog/Course_Card';
import Footers from "../components/Footers"

import { useSelector } from "react-redux";

const Catalog =() => {
    const {loading} = useSelector((state) => state.profile)
    const {catalogName} = useParams()
    const [active , setActive] = useState(1)
    const [catalogPageData , setCatalogPageData] = useState(null)
    const [categoryId , setCategoryId] = useState("")

    useEffect(() => {
        const getCategories = async() => {
            console.log("using to get all category")
            const res = await apiConnector("GET" , categories.CAT_API
              
            )
            console.log(res.data.data)
            const result = res?.data?.data
            const objectwithName = result.find(obj => obj.Name === catalogName)
            const category_id = objectwithName? objectwithName._id : null
            console.log("ctid log krri h ",category_id)
            setCategoryId(category_id);
        }
        getCategories()

    },[])

    useEffect(() =>{
        const getCategoryDetails = async() => {
            try{ 
              console.log("getCatdetails wale fun me check kr rhe hu ki id bni ya ni " , categoryId)
              console.log("entering getCategory Details")
                const res = await getCatalogPageData(categoryId)
                console.log("res ko conmsole karteh h :" , res)
                setCatalogPageData(res)
            }
            catch(err){
                console.log(err)
             }
        }
        if(categoryId) {
            getCategoryDetails()
        }
    },[categoryId])

    if (loading || !catalogPageData) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }

      return (
        <>
          {/* Hero Section */}
          <div className=" box-content bg-richblack-800 px-4">
            <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
              <p className="text-sm text-richblack-300">
                {`Home / Catalog / `}
                <span className="text-yellow-25">
                  {catalogPageData?.data?.selectedCategory?.Name}
                </span>
              </p>
              <p className="text-3xl text-richblack-5">
                {catalogPageData?.data?.selectedCategory?.Name}
              </p>
              <p className="max-w-[870px] text-richblack-200">
                {catalogPageData?.data?.selectedCategory?.Description}
              </p>
            </div>
          </div>
    
          {/* Section 1 */}
          <div className=" mx-auto  w-full  px-4 py-12  text-white">
            <div className="section_heading text-2xl font-semibold">Courses to get you started</div>
            <div className="my-4 flex border-b border-b-richblack-600 text-sm">
              <p
                className={`px-4 py-2 ${
                  active === 1
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Populer
              </p>
              <p
                className={`px-4 py-2 ${
                  active === 2
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(2)}
              >
                New
              </p>
            </div>
            <div>
              <CourseSlider
                Courses={catalogPageData?.data?.selectedCategory?.Course}
              />
            </div>
          </div>
          {/* Section 2 */}
          <div className=" mx-auto w-full px-4 py-12">
            <div className="section_heading">
              Top courses in {catalogPageData?.data?.differentCategory?.Name}
            </div>
            <div className="py-8">
              <CourseSlider
                Courses={catalogPageData?.data?.differentCategory?.Course}
              />
            </div>
          </div>
    
          {/* Section 3 */}
          <div className=" mx-auto  w-full  px-4 py-12 text-white   ">
            <div className="section_heading text-2xl font-semibold">Frequently Bought</div>
            <div className="py-8">
              <div className="grid grid-cols-1 gap-x-16 gap-y-6 lg:grid-cols-2">
                {catalogPageData?.data?.mostSellingCourses
                  ?.slice(0, 4)
                  .map((course, i) => (
                    <Course_Card course={course} key={i} Height={"h-[400px]"} />
                  ))}
              </div>
            </div>
          </div>
    
          <Footers />
        </>
      )


}

export default Catalog