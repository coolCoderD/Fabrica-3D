import { Canvas } from '@react-three/fiber'
import { Environment, Center } from '@react-three/drei';

import Shirt from './Shirt';
import Backdrop from './Backdrop';
import CameraRig from './CameraRig';

const CanvasModel = () => {
  return (
    <>
    {/* <div>
      <h1 className="text-white absolute top-4 right-0 text-2xl z-10">Canvas Model</h1>
    </div> */}
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full bg-[#1F1F1F]  transition-all ease-in"
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />

      <CameraRig>
        <Backdrop />
        <Center>
          
          <Shirt />
        
        </Center>
      </CameraRig>
    </Canvas>
    </>
  )
}

export default CanvasModel