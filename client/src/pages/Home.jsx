import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';

import state from '../store';
import { CustomButton } from '../components';

import {
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation
} from '../config/motion';
import AiBtn from '../components/AiBtn';

const Home = () => {
    const snap = useSnapshot(state);

    return (
        <AnimatePresence>
            {snap.intro && (
                <motion.section className="home" {...slideAnimation('left')}>
                    <motion.header {...slideAnimation('down')}>
                        <img src="./threejs.png" alt="logo" className="w-8 h-8 object-contain" />
                    </motion.header>

                    <motion.div className="home-content" {...headContainerAnimation}>
                        <motion.div {...headTextAnimation}>
                            <h1 className="text-white text-9xl font-black">
                                DESIGN <br className="xl:block hidden" /> YOUR WAY.
                            </h1>
                        </motion.div>

                        <motion.div {...headContentAnimation}>
                            <p className="max-w-md font-normal text-white text-base mb-8">
                                Welcome to <strong>Fabrica 3D</strong> – your ultimate 3D customization platform.
                                Create personalized, one-of-a-kind shirts with our interactive design tool. <br />
                                <strong>Express your creativity</strong> and craft the perfect look, just for you!
                            </p>
                            <AiBtn text="Start Designing" OnClick={() => (state.intro = false)} isSparkles={true} />
                        </motion.div>
                    </motion.div>


                </motion.section>
            )}
        </AnimatePresence>
    );
};

export default Home;
