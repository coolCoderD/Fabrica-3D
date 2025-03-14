import React from 'react'

const Btn = ({text,icon,onClick,isLoading}) => {
    return (
 
        <button className={`${isLoading? "opacity-50 animate-pulse":""} button`}
        disabled={isLoading}
          onClick={onClick}>
          <div className="dots_border" />
          <div className='w-full h-full z-50'>
          {icon}
          </div>
          <span className="text_button">{text}</span>
        </button>
  
    );
  }


export default Btn