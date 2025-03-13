import { swatch, fileIcon, ai, logoShirt, stylishShirt, naruto, tanjiro, luffy } from "../assets";
import narutoPics from '../assets/naruto/index'
import demonSlayer from "../assets/demonSlayer/index";
import onePiece from "../assets/onePiece/index";
import { change } from "../assets";
import Tooltip from "../components/Tooltip";


export const EditorTabs = [
  {
    name: "colorpicker",

    icon: swatch,
    tooltip: "Change the color of your design", // Example: Shortcut for quick access
  },
  {
    name: "filepicker",

    icon: fileIcon,
    tooltip: "Upload an image",
  },
  {
    name: "aipicker",
    icon: ai,
    tooltip: "Ask AI for design recommendations",
  },
  {
    name: "logoshapechanger",
  
    icon: change,
    tooltip: "Modify the logo shape",
  },
];


export const FilterTabs = [
  {
    name: "logoShirt",
    icon: logoShirt,
  },
  {
    name: "stylishShirt",
    icon: stylishShirt,
  },
];

export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
};

export const AnimeTabs = [
  {
    name: "naruto",
    icon: naruto,
  },
  {
    name: "demonSlayer",
    icon: tanjiro,
  },{
    name: "onePiece",
    icon: luffy,
  }
];

export const AnimePic = {
  naruto: Object.values(narutoPics),
  demonSlayer: Object.values(demonSlayer),
  onePiece: Object.values(onePiece),
};


