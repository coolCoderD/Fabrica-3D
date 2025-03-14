import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Tooltip({ children, text, position = "right" }) {
  const [hovered, setHovered] = useState(false);

  // Position styles and arrow positioning
  const positionClasses = {
    right: "left-full ml-3  -translate-y-1/2",
    left: "right-full mr-3 top-1/2 -translate-y-1/2",
    top: "bottom-full mb-3 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-3 left-1/2 -translate-x-1/2",
  };

  const arrowClasses = {
    right: "left-0 -ml-2 top-1/2 -translate-y-1/2 rotate-180",
    left: "right-0 -mr-2 top-1/2 -translate-y-1/2",
    top: "bottom-0 -mb-2 left-1/2 -translate-x-1/2 rotate-90",
    bottom: "top-0 -mt-2 left-1/2 -translate-x-1/2 -rotate-90",
  };

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <AnimatePresence>
  {hovered && (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={`absolute ${positionClasses[position]} bg-black text-white text-sm px-4 py-2 rounded-lg shadow-lg z-50 w-44`}
    >
      {/* Animated Gradient Borders */}
      <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px animate-glow" />
      <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px animate-glow" />

      <div className="relative">{text}</div>

      {/* Tooltip Arrow */}
      <div
        className={`absolute w-3 h-3 bg-black transform rotate-45 ${arrowClasses[position]}`}
      ></div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
}
