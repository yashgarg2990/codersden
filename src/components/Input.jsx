import React from 'react'

function Input({htmlFor , labelname  ,typename , id ,name , valuename , setfunction , placeholder}) {
  return (
    <div className='w-full'>
        <label htmlFor={htmlFor} className="block text-xs 2xl:text-lg font-medium text-white mb-1">
          {labelname} <span className="text-red-600">*</span>
        </label>
        <input
          type={typename}
          id={id}
          name={name}
          value={valuename}
          onChange={(e) => setfunction(e.target.value)}
          className="px-3 py-2  border bg-slate-800 rounded-md text-white  font-medium text-sm 2xl:text-base w-full "
          style={{ border: 'none' }}
          placeholder={`Enter your ${placeholder}`}
          autoComplete="off"
          required
        />
    </div>
  )
}

export default Input
