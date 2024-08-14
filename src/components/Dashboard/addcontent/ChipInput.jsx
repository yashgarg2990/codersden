import React from 'react'
import { useState , useEffect } from 'react'
// Importing React icon component
import { MdClose } from "react-icons/md"
import { useSelector } from "react-redux"

export default function ChipInput({
    // Props to be passed to the component
    label,
    name,
    placeholder,
    register,
    errors,
    setValue,
    getValues,
  }){


    const { editCourse, course } = useSelector((state) => state.course)

    // Setting up state for managing chips array
    const [chips, setChips] = useState([])
    useEffect(() => {
        if (editCourse) {
          // console.log(course)
          setChips(course?.tag)
        }
        register(name, { required: true, validate: (value) => value.length > 0 })
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
    
      useEffect(() => {
        setValue(name, chips)
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [chips])

      const handleKeyDown = (event) =>{
        if(event.key=== "Enter" || event.key===",") {
            event.preventDefault()
            const chipValue = event.target.value.trim()

            if(chipValue && !chips.includes(chipValue) ){
                const newChips = [...chips , chipValue]
                setChips(newChips)
                event.target.value = ""
            }
        }
      }

      const handleDeleteChip = (chipIndex) => {
        // Filter the chips array to remove the chip with the given index
        const newChips = chips.filter((_, index) => index !== chipIndex)
        setChips(newChips)
      }


    return(
        <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label> 
        <div className='flex w-full flex-wrap gap-y-2'>
            {chips.map((chip ,index)=>(
                 <div
                 key={index}
                 className="m-1 flex items-center rounded-full bg-slate-900 border border-solid border-richblack-700 pl-4 pr-2 py-1 text-sm text-richblack-5"
               >
                {chip}
                <button type="button"
                className='ml-2 focus:outline-none'
                onClick={() => handleDeleteChip(index)} >
                    <MdClose className="text-sm" />

                </button>

               </div>
            ))}

<input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="form-style w-full py-2 px-3 bg-slate-900 rounded-md  text-white border border-solid border-white focus:outline-none focus:border-amber-300"
        />
        </div>
        {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
        </div>
    )
  }