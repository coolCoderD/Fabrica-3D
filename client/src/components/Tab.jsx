import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../store'



const Tab = ({tab,isFilterTab,isActiveTab,handleClick}) => {
  const snap=useSnapshot(state);
  const activeStyle=isFilterTab && isActiveTab?{backgroundColor:snap.color}:{backgroundColor:'transparent'}
  return (
    <div
    key={tab.name}
    className={`tab-btn  ${isFilterTab? 'rounded-full glassmorphism':'rounded-4 '}`}
    onClick={handleClick} style={activeStyle}
    >
      <img src={tab.icon} alt={tab.name} className={`${isFilterTab?'w-2/3 h-2/3':'w-11/12 h-11/12'}`} />
    </div>
  )
}

export default Tab