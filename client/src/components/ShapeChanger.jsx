import { useState } from "react";
import { motion } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../store";
import CustomButton from "./CustomButton";


export default function ShapeChanger() {
  const snap = useSnapshot(state);
  const [shapeIndex, setShapeIndex] = useState(0);

  const shapes = [
    { name: "square", svg: <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill={snap.color}  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square"><rect width="18" height="18" x="3" y="3" rx="2"/></svg> },

  { name: "circle", svg: <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill={snap.color}  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle"><circle cx="12" cy="12" r="10"/></svg> },
  {
    name: "star",
    svg: (
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill={snap.color}  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>
      )
  },
  {
    name: "heart",
    svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill={snap.color}  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
    ),
  },
];


  const nextShape = () => {
    setShapeIndex((prev) => (prev + 1) % shapes.length);
    state.selectedMask = shapes[shapeIndex].name;
    console.log(state.selectedMask);
  };

  return (
    <div className='shapechanger-container'>
    <div className="flex flex-col items-center gap-4  justify-center">
      {/* Shape Display with SVGs */}
      <motion.svg
        key={shapeIndex}
        width="200"
        height="200"
        viewBox="0 0 100 100"
        className="bg-transparent"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        {shapes[shapeIndex].svg}
      </motion.svg>

      {/* Change Shape Button */}
      <CustomButton
        handleClick={nextShape}
        type="filled"
        title={`Change Shape`}
        customStyles="w-fit px-4 py-2.5 font-bold text-sm"
      >
        Change Shape ({shapes[shapeIndex].name})
      </CustomButton>
    </div>
    </div>
  );
}
