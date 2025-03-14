import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Shirt, Watch, Link, HardHat, ShellIcon, Sparkles } from "lucide-react";
import { useSnapshot } from "valtio";
import state from "../store";

const recommendationIcons = {
  bottom_wear: <Shirt size={24} className="text-[#00f7ff]" />,
  footwear: <ShellIcon size={24} className="text-[#00f7ff]" />,
  accessories: <Watch size={24} className="text-[#00f7ff]" />,
};



// Sidebar animation for entry and exit
const sidebarVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 70, damping: 12,},
    },
    exit: { 
      x: "100%", 
      opacity: 0, 
      transition: { ease: "easeInOut", duration: 0.5 } 
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

export default function FashionPanel({recommendations, isOpen, onClose }) {
  const [expanded, setExpanded] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const snap=useSnapshot(state);
  const activeStyle={
    color:snap.color
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed top-0 scrollbar-hide overflow-y-auto  right-0 w-[550px] h-full bg-[#1F1F1F] text-white shadow-2xl p-8 flex flex-col z-50 border-l border-[#00f7ff]/20  backdrop-blur-lg"
        >
          {/* Header */}
          <div className="flex justify-between scrollbar-hide overflow-y-auto items-center mb-6">
            <div className="flex items-center gap-3">
              <Sparkles className="text-[#00f7ff]" size={24} />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#00f7ff] to-[#bc13fe] text-transparent bg-clip-text">
                AI Style Assistant
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="text-gray-400 hover:text-white transition-colors" />
            </button>
          </div>

          {/* Recommendation Items */}
          <div className="flex flex-col gap-4 scrollbar-hide overflow-y-auto">
          {["bottom_wear", "footwear"].map((key) => (
              <motion.div
                key={key}
                variants={itemVariants}
                className="relative"
                onMouseEnter={() => setHoveredItem(key)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className={`glass-card neon-border rounded-lg transition-all duration-300 `}>
                  <button
                    className="flex items-center gap-4 w-full p-4"
                    onClick={() => setExpanded(expanded === key ? null : key)}
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl backdrop-blur-md">
                      {recommendationIcons[key]}
                    </div>
                    <span className="font-medium text-left">{recommendations[key].item}</span>
                  </button>
                  <AnimatePresence>
                    {expanded === key && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-4 text-sm text-gray-400 leading-relaxed">
                          {recommendations[key].reason}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}

            {recommendations.accessories.map((accessory, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
                onMouseEnter={() => setHoveredItem(`accessory-${index}`)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className={`glass-card neon-border rounded-lg transition-all duration-300 `}>
                  <button
                    className="flex items-center gap-4 w-full p-4"
                    onClick={() => setExpanded(expanded === accessory.item ? null : accessory.item)}
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl backdrop-blur-md">
                      {recommendationIcons.accessories}
                    </div>
                    <span className="font-medium text-left">{accessory.item}</span>
                  </button>
                  <AnimatePresence>
                    {expanded === accessory.item && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-4 text-sm text-gray-400 leading-relaxed">
                          {accessory.reason}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
