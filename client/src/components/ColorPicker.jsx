import React from 'react'
import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'
import state from '../store'

const ColorPicker = () => {
  const snap=useSnapshot(state);
  return (
    <div className='absolute glassmorphism  left-full ml-3 '>

      <SketchPicker
      color={snap.color}
      disableAlpha
      presetColors={[
        "#ccc", "#EFBD4E", "#F5F5F5", "#FFFFFF", "#2CCCE4", 
        "#FF5733", "#C70039", "#900C3F", "#581845", "#3498DB",
        "#27AE60", "#F39C12", "#8E44AD", "#E74C3C", "#2ECC71"
      ]}
      onChange={(color)=>state.color=color.hex}
      />
    </div>
  )
}

export default ColorPicker