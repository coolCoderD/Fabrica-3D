import React from 'react'
import Sketch from '@uiw/react-color-sketch';
import { useSnapshot } from 'valtio'
import state from '../store'

const ColorPicker = () => {
  const snap=useSnapshot(state);
  return (
    <div className='absolute input left-full '>
<Sketch
  style={{
    marginLeft: 20,
    width: "320px",
    height: "320px",
    background: "rgba(0,0,0,0.25)",
    boxShadow: "0 2px 30px 0 rgba(31, 38, 135, 0.07)",
    backdropFilter: "blur(4px)",
    border: "1px solid rgba(0, 0, 0, 0.18)",
    color:"white",
  }}
  color={snap.color}
  disableAlpha={true}
  onChange={(color) => (state.color = color.hex)}
/>

    </div>
  )
}

export default ColorPicker