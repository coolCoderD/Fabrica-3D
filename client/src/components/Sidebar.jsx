import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Shirt, Watch, Link, HardHat, ShellIcon } from "lucide-react";

const recommendationIcons = {
  bottom_wear: <Shirt size={20} className="text-gray-700" />,
  footwear: <ShellIcon size={20} className="text-gray-700" />,
  accessories:<Watch size={20} className="text-gray-700" />,
};



// Sidebar animation for entry and exit
const sidebarVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 70, damping: 12 } 
    },
    exit: { 
      x: "100%", 
      opacity: 0, 
      transition: { ease: "easeInOut", duration: 0.5 } 
    },
  };
  

export default function FashionPanel({recommendations, isOpen, onClose }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed text-white top-0 right-0 w-[550px] h-full bg-[#1F1F1F] shadow-lg p-6 flex flex-col z-50"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">AI Recommendations</h2>
            <button variant="ghost" onClick={onClose}>
              <X />
            </button>
          </div>

          {/* Recommendation Items */}
          <div className="flex flex-col gap-4 overflow-auto">
            {["bottom_wear", "footwear"].map((key) => (
              <div key={key} className="p-4 border rounded-lg">
                <button
                  className="flex items-center gap-4 w-full"
                  onClick={() => setExpanded(expanded === key ? null : key)}
                >
                  <div className="w-10 h-10  flex items-center justify-center bg-gray-200 rounded-full">
                    {recommendationIcons[key]}
                  </div>
                  <span className="font-semibold text-left">{recommendations[key].item}</span>
                </button>
                {expanded === key && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-sm text-gray-300 mt-2"
                  >
                    {recommendations[key].reason}
                  </motion.p>
                )}
              </div>
            ))}
            {recommendations.accessories.map((accessory, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <button
                  className="flex items-center gap-4 w-full"
                  onClick={() => setExpanded(expanded === accessory.item ? null : accessory.item)}
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
                    {recommendationIcons.accessories}
                  </div>
                  <span className="font-semibold text-left">{accessory.item}</span>
                </button>
                {expanded === accessory.item && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-sm text-gray-300 mt-2"
                  >
                    {accessory.reason}
                  </motion.p>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
