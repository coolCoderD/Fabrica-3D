import React from 'react'
import { SketchPicker } from 'react-color'

const AnimeContainer = () => {
  return (
    <div className='anime-container '>
        {
            [1,2,3,4,5].map((item,index)=>( 
                <div>
                    <div className='w-full h-full bg-white rounded-full'>
                   
                    </div>
                </div>
            ))
        }
       
    </div>
  )
}

export default AnimeContainer