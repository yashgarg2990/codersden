import React from 'react';

function Numberfield({
  htmlFor,
  labelname,
  typename,
  id,
  name,
  valuename,
  setfunction,
  placeholder,
}) {
  const handleChange = (e) => {
    let newValue = e.target.value;
    if (typename === 'number' && newValue.length > 10) {
      newValue = newValue.slice(0, 10);
    }
    if (typeof setfunction === 'function') {
      setfunction(newValue);
    }
  };

  return (
    <div className="w-full">
      <label htmlFor={htmlFor} className="block text-xs 2xl:text-lg font-medium text-white mb-1">
        {labelname} <span className="text-red-600">*</span>
      </label>
      <input
        type={typename}
        id={id}
        name={name}
        value={valuename}
        onChange={handleChange}
        className="px-3 py-2  border bg-slate-800 rounded-md text-white font-medium text-sm 2xl:text-base w-full 
         [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
        "
        style={{
          border: 'none',
         
        }}
        placeholder={`Enter your ${placeholder}`}
        autoComplete="off"
        pattern="[0-9]*"
        required
      />
    </div>
  );
}

export default Numberfield;