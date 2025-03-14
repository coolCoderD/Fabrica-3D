import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import config from '../config/config';
import state from '../store';
import { download, luffy, naruto, tanjiro } from '../assets';
import { getFashionRecommendation, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes, AnimeTabs } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';
import axios from 'axios';
import html2canvas from "html2canvas";
import ShapeChanger from '../components/ShapeChanger';
import AnimeContainer from '../components/AnimeContainer';
import { AnimePic } from '../config/constants';
import AiBtn from '../components/AiBtn';
import FashionPanel from '../components/Sidebar';
import Tooltip from '../components/Tooltip';
import { DoorOpen, DownloadIcon } from 'lucide-react';
import Btn from '../components/Btn';

const animeThemes = {
  naruto: naruto,
  demonSlayer: tanjiro,
  onePiece: luffy,
};

const animeColors = {
  naruto: "#FF9900", 
  demonSlayer: "#2E8B57", 
  onePiece: "#1E90FF",
};

const Customizer = () => {
  const snap = useSnapshot(state);
  const [isOpen, setIsOpen] = useState(false);

  const [file, setFile] = useState('');

  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })
  const [isDownloading, setIsDownloading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedAnime, setSelectedAnime] = useState('');
  const editorRef = useRef(null);
  const animeRef=useRef(null);

  const animeColors = {
    naruto: "#FF9900", // Orange (Naruto's theme)
    demonSlayer: "#2E8B57", // Green (Tanjiro's haori)
    onePiece: "#1E90FF", // Blue (Luffy's outfit)
  };
  
  const handleThemeChange = (theme) => {
    if (selectedAnime === theme) {
      setSelectedAnime(""); 
      state.color = "#EFBD48"; 
    } else {
      setSelectedAnime(theme);
      state.color = animeColors[theme]; // Set corresponding anime color
    }
  
    handleDecals("logo", animeThemes[theme]);
       
  };
  

  const loadImageWithCORS = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous"; // Enables CORS
      img.src = url;
      
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
    });
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

  const genrateAnimeTab=()=>{
    console.log(selectedAnime.length)
    if(selectedAnime.length!==0) return <AnimeContainer pics={AnimePic[selectedAnime]} handleDecals={handleDecals}/>
  }
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
          preview={preview}
          setPreview={setPreview}
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
    if (
      editorRef.current && !editorRef.current.contains(event.target)
    ) {
      setActiveEditorTab(""); // Close editor tab
    
    }
    if(
      animeRef.current && !animeRef.current.contains(event.target)
    ){
      setSelectedAnime("");
    }
  };
  

  useEffect(() => {
    if (activeEditorTab || selectedAnime.length!==0) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeEditorTab,selectedAnime]);



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

    if (type == 'no') {
      state.isLogoTexture = false;
      state.isFullTexture = false;
      state.fullDecal = './threejs.png';
      state.logoDecal = './threejs.png';
      return;
    }
    const decalType = DecalTypes[type];
    console.log(decalType.stateProperty, result);

    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
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
    setPreview(null);
    handleDecals('no');

    if (activeFilterTab.logoShirt) {
      handleActiveFilterTab('logoShirt');
    }

    if (activeFilterTab.stylishShirt) {
      handleActiveFilterTab('stylishShirt');
    }

  }


  const fetchRecommendation = async () => {
    setIsLoading(true); // Start loading
    try {
      console.log(snap.color);
      const recommendation = await getFashionRecommendation(snap.color);
      
      if (recommendation) {
        setRecommendations(recommendation);
        setIsOpen(true); // Open sidebar only when data is set
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };


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
              <div ref={editorRef} className="editortabs-container tabs ">
                {EditorTabs.map((tab) => (
                  <Tooltip key={tab.name} text={tab.tooltip}>
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => toggleEditorTab(tab.name)}
                    isActiveTab={activeEditorTab === tab.name}
                  />
                  </Tooltip>
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div
            key="customAnime"
            className="absolute top-0 right-0 z-10"
            {...slideAnimation('right')}
          >
            <div className="flex   items-center min-h-screen">
              <div ref={animeRef}  className="editortabs-container tabs">
                {AnimeTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => handleThemeChange(tab.name)}
                    isActiveTab={selectedAnime === tab.name}  // Fixed
                    isAnimeTab={true}
                  />
                ))}
                {genrateAnimeTab()}
              </div>;
            </div>
          </motion.div>

          <motion.div
            className="absolute flex gap-4 z-10 top-5 right-5"
            {...fadeAnimation}
          >
          <div   onClick={() => state.intro = true}>
            <AiBtn
              text="Go back" 
            />
            </div>
            <Btn 
            text={"Download"}
            isLoading={isDownloading}
            onClick={downloadCanvasToImage}
            icon={<DownloadIcon className='text-white'/>}
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
            className="absolute mb-8 z-10 flex gap-5 bottom-5 right-5"
            {...fadeAnimation}
          >

<AiBtn text={"Get Outfit Recommendations"}
            isLoading={isLoading}
            OnClick={()=>{
              fetchRecommendation();
            }}
            isSparkles={true}
            />
            <FashionPanel  recommendations={recommendations} isOpen={isOpen} onClose={() => setIsOpen(false)} />
          </motion.div>

        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer