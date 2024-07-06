import React from 'react'
import {Link} from "react-router-dom"

function Button({children , active  , linkto}) {
  return (
    <div>
      <Link to={linkto}>
      <div className={`text-center text-xs px-6 py-2  rounded-md font-bold ${active ? "bg-yellow-300 text-black" : "bg-slate-700 text-slate-200"}
      hover:scale-95 transition-all duration-300 `}>
        <p>{children}</p>
      </div>
      </Link>
    </div>
  )
}

export default Button
