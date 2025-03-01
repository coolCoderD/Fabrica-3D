import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../store'



const Tab = ({ tab, isFilterTab, isActiveTab, handleClick, isAnimeTab }) => {
  const snap = useSnapshot(state);
  const activeStyle = (isFilterTab || isAnimeTab) && isActiveTab 
    ? { backgroundColor: snap.color } 
    : { backgroundColor: 'transparent' };

  return (
    <div
      key={tab.name}
      className={`tab-btn ${isFilterTab || isAnimeTab ? 'rounded-full glassmorphism' : 'rounded-md'} overflow-hidden`}
      onClick={handleClick}
      style={activeStyle}
    >
      <img 
        src={tab.icon} 
        alt={tab.name} 
        className={`${isFilterTab ? 'w-2/3 h-2/3' : 'w-11/12 h-11/12'} ${isAnimeTab ? "rounded-full w-[95%] h-[95%]" : ""}`} 
      />

    </div>
  );
};




export default Tab