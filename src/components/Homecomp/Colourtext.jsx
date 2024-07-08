import React from 'react'

function Colourtext({ children,colour }) {
    return (
      <div>
        <span className={`text-${colour}`}>
          {children}
        </span>
      </div>
    );
  }
  export default Colourtext;
