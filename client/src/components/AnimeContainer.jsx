import React, { useState } from "react";
import { useSnapshot } from "valtio";
import state from "../store";

const AnimeContainer = ({ pics,handleDecals }) => {
  console.log(pics);
  const snap = useSnapshot(state);
  const [selectedIndex, setSelectedIndex] = useState(null); // Track selected image index

  return (
    <div className="anime-container grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] grid-rows-3 gap-3 justify-center">
      {pics.map((pic, index) => (
        <img
          key={index}
          src={pic.image}
          alt="pic"
          className="w-20 h-20 cursor-pointer rounded-full object-cover border-2 shadow-lg transition-all"
          style={{
            borderColor: selectedIndex === index ? snap.color : "white",
            borderWidth: "3px",
          }}
          onClick={() => {
            setSelectedIndex(index);
            handleDecals("logo",pic.image);
            state.color=pic.color
          }} // Set selected image
        />

      ))}
<div className="w-12 mt-4 h-12 flex items-center justify-center rounded-full bg-red-500 shadow-lg hover:bg-red-600 transition-all cursor-pointer"
onClick={()=>{
  handleDecals("logo","./threejs.png");
}}
>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="white" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="lucide lucide-x"
  >
    <path d="M18 6 6 18"/>
    <path d="m6 6 12 12"/>
  </svg>
</div>


    </div>
  );
};

export default AnimeContainer;
