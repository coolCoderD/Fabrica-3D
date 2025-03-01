import React from 'react'
import {motion , AnimatePresence} from 'framer-motion'
import {useSnapshot} from 'valtio'

import state from '../store'
import { CustomButton } from '../components'

import {
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation
  } from '../config/motion';

const Home = () => {
    const snap=useSnapshot(state);
    
  return (
    <AnimatePresence >
        {snap.intro && (
            <motion.section className="home" {...slideAnimation('left')}>
                <motion.header {...slideAnimation('down')}>
                    <img src='./threejs.png' alt="logo" className="w-8 h-8 object-contain"/>
                </motion.header>

                <motion.div className="home-content" {...headContainerAnimation}>
    <motion.div {...headTextAnimation}>
        <h1 className="text-white text-9xl font-black">
            DESIGN <br className="xl:block hidden"/> YOUR WAY.
        </h1>
    </motion.div>
    
    <motion.div {...headContentAnimation} className="flex flex-col gap-5">
        <p className="max-w-md font-normal text-white text-base">
            Welcome to <strong>Fabrica 3D</strong> – your ultimate 3D customization platform.  
            Create personalized, one-of-a-kind shirts with our interactive design tool. <br/> 
            <strong>Express your creativity</strong> and craft the perfect look, just for you!
        </p>
        
        <CustomButton
            type="filled"
            title="Start Designing"
            handleClick={() => state.intro = false}
            customStyles="w-fit px-4 py-2.5 font-bold text-sm"
        />
    </motion.div>
</motion.div>

            </motion.section>
        )}
    </AnimatePresence>
  )
}

export default Home