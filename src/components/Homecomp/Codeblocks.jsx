import React from 'react';
import { TypeAnimation } from 'react-type-animation';

function Codeblocks({ code }) {
  return (
    <div className='min-h-max min-w-max'>
      <div className='flex flex-row max-h-max  mt-6   min-w-max'>
        <div className='flex flex-col w-[5%] ml-3 text-slate-400 text-sm text-bold'>
          {[...Array(12).keys()].map((num) => (
            <p key={num + 1}>{num + 1}</p>
          ))}
        </div>
        <div className='flex flex-col w-[95%] text-yellow-200 text-bold text-sm'>
          <TypeAnimation
            sequence={[
              code,
              2000, // Wait for 4 seconds after typing the code
              "" // Retype the code
            ]}
            repeat={Infinity}
             cursor={true}
            wrapper="pre"
            style={{ display: 'block' }}
            className="code-display"
            omitDeletionAnimation={true}
        
          />
        </div>
      </div>
    </div>
  );
}

export default Codeblocks;
