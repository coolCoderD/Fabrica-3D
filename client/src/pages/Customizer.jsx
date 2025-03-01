import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import config from '../config/config';
import state from '../store';
import { download, luffy, naruto, tanjiro } from '../assets';
import { reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes, AnimeTabs } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';
import axios from 'axios';
import html2canvas from "html2canvas";
import ShapeChanger from '../components/ShapeChanger';

const animeThemes = {
  naruto: naruto,
  demonSlayer: tanjiro,
  onePiece: luffy,
};

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState('');

  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })
  const [isDownloading, setIsDownloading] = useState(false);

  const [selectedAnime, setSelectedAnime] = useState('');
  const editorRef = useRef(null);

  const handleThemeChange = (theme) => {
    console.log(theme);
    setSelectedAnime((prev)=> theme===prev? "": theme);
    handleDecals('logo', animeThemes[theme]);
  };


 const downloadCanvasToImage = async () => {
  const canvasContainer = document.querySelector(".w-full.max-w-full.h-full"); // Select the canvas wrapper
  
  if (!canvasContainer) {
    alert("Canvas container not found!");
    return;
  }

  setIsDownloading(true); 

  try {
    const canvas = await html2canvas(canvasContainer, { useCORS: true });
    const dataURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "canvas_screenshot.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error capturing canvas:", error);
  }
  finally {
    setIsDownloading(false); // Stop downloading state
  }
};



  const toggleEditorTab = (tabName) => {
    setActiveEditorTab((prevTab) => (prevTab === tabName ? "" : tabName));
  };
  // show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />
      case "filepicker":
        return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}
          removeFile={removeFile}
        />
      case "aipicker":
        return <AIPicker 
          prompt={prompt}
          setPrompt={setPrompt}
          generatingImg={generatingImg}
          handleSubmit={handleSubmit}
        />
        case "logoshapechanger":
        return <ShapeChanger />
      default:
        return null;
    }
  }

  const handleClickOutside = (event) => {
    if (editorRef.current && !editorRef.current.contains(event.target)) {
      setActiveEditorTab(""); // Close the editor tab if clicked outside
    }
  };

  useEffect(() => {
    if (activeEditorTab) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeEditorTab]);



  const handleSubmit = async (type) => {
    if (typeof prompt !== "string" || !prompt.trim()) {
      return alert("Please enter a valid prompt");
    }
  
    console.log("Asking AI, it will take some time...");
    const startTime = performance.now(); // Start time
  
    try {
      setGeneratingImg(true);
  
      // API call with responseType "blob"
      const response = await axios.post(
        "https://fabrica-3d.onrender.com/generate-image/",
        { 
          inputs: prompt,  
          parameters: { num_inference_steps: 50 } 
        },
        {
          headers: { "Content-Type": "application/json" },
          responseType: "blob",  // Ensure response is binary data
        }
      );
  
      const endTime = performance.now(); // End time
      const timeTaken = ((endTime - startTime) / 1000).toFixed(2); // Convert to seconds
  
      console.log(`Done. Time taken: ${timeTaken} seconds`);
  
      if (response.status === 402) {
        alert("Limit Reached");
        return;
      }
  
      if (response.status !== 200) {
        const errorMessage = await response.data.text();  // Read error message
        throw new Error(`Error: ${response.status} - ${errorMessage}`);
      }
  
      // Convert Blob to Base64 URL
      const blob = new Blob([response.data], { type: "image/png" });
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64Image = reader.result;
        handleDecals(type, base64Image);
      };
  
      alert(`Image generated in ${timeTaken} seconds`);
  
    } catch (error) {
      console.error("Error:", error);
      alert(`Failed to generate image: ${error.message}`);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  };
  
  
  
  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    console.log(decalType.stateProperty, result);

    state[decalType.stateProperty] = result;

    if(!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
          state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
          state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    // after setting the state, activeFilterTab is updated

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }

  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      })
  }

  const removeFile = () => {
    setFile(''); 
  }


  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
       
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation('left')}
          >
            <div className="flex  items-center min-h-screen">
              <div  ref={editorRef} className="editortabs-container tabs ">
                {EditorTabs.map((tab) => (
                  <Tab 
                    key={tab.name}
                    tab={tab}
                    handleClick={() => toggleEditorTab(tab.name)}
                    isActiveTab={activeEditorTab===tab.name}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div
            key="custom"
            className="absolute top-0 right-0 z-10"
            {...slideAnimation('left')}
          >
            <div className="flex  items-center min-h-screen">
            <div className="editortabs-container tabs">
  {AnimeTabs.map((tab) => (
    <Tab 
      key={tab.name}
      tab={tab}
      handleClick={() => handleThemeChange(tab.name)}
      isActiveTab={selectedAnime === tab.name}  // Fixed
      isAnimeTab={true}
    />
  ))}
</div>;
            </div>
          </motion.div>

          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton 
              type="filled"
              title="Go Back"
              handleClick={() => state.intro = true}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          <motion.div
            className='filtertabs-container '
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
          <motion.div
            className="absolute mb-8 z-10 bottom-5 right-5"
            {...fadeAnimation}
          >
<CustomButton 
  type="filled"
  title={isDownloading ? "Downloading..." : "Download Shirt"}
  handleClick={downloadCanvasToImage}
  disabled={isDownloading} // Disable button while downloading
  customStyles={`w-fit px-4 py-2.5 font-bold text-sm
  ${isDownloading ? "bg-gray-400 animate-pulse" : ""}
  `}
/>

          </motion.div>
         
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer