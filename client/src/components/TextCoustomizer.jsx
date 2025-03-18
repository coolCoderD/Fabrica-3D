import React, { useState, useEffect } from "react";
import { ChromePicker, CirclePicker, SketchPicker } from "react-color";
import state from "../store";

import Wheel from '@uiw/react-color-wheel';

const TextCustomizer = () => {
  const [text, setText] = useState("Your Text");
  const [fontSize, setFontSize] = useState(48);
  const [color, setColor] = useState("#ffffff");
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    state.customText = text;
    state.textSize = fontSize;
    state.textColor = color;
    state.textPosition = position;
  }, [text, fontSize, color, position]);

  return (
    <div className="text-container">


      {/* Grid Layout with Less Gaps */}
      <div className="grid grid-cols-2 gap-10">
        {/* Text & Font Size */}
        <div>
          <label className="block font-bold text-xl text-white mb-1">Text:</label>
          <textarea
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="input-field"
          />

          {/* Font Size */}
          <div className="mt-2">
            <label className="block font-bold text-xl text-white mb-1">Font Size:</label>
            <input
              type="range"
              min="10"
              max="100"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              className="w-full range-slider"
            />
            <span className="block text-center text-gray-300 font-semibold mt-1">{fontSize}px</span>
          </div>
        </div>

        {/* Text Position */}
        <div>
          <label className="block font-bold text-xl text-white mb-1">Position:</label>
          <div className="grid grid-rows-2 gap-2">
            <div>
              <span className="block font-semibold text-white mb-1">X-Axis</span>
              <input
                type="range"
                min="-0.5"
                max="0.5"
                step="0.01"
                value={position.x}
                onChange={(e) => setPosition({ ...position, x: parseFloat(e.target.value) })}
                className="w-full range-slider"
              />
            </div>
            <div>
              <span className="block font-semibold  text-white mb-1">Y-Axis</span>
              <input
                type="range"
                min="-0.5"
                max="0.5"
                step="0.01"
                value={position.y}
                onChange={(e) => setPosition({ ...position, y: parseFloat(e.target.value) })}
                className="w-full range-slider"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Text Color Picker */}
      <div className="mt-3">
        <label className="block font-bold text-lg text-white mb-1">Text Color:</label>
        <div className="flex justify-center">
          {/* <ChromePicker
            color={color}
            onChange={(updatedColor) => setColor(updatedColor.hex)}
          /> */}
{/* <CirclePicker
  color={color}
  onChange={(updatedColor) => setColor(updatedColor.hex)}
/> */}



<Wheel
  color={color}
  onChange={(updatedColor) => setColor(updatedColor.hex)}
  style={{
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    boxShadow: "0 0 15px rgba(0, 255, 255, 0.6)",
    background: "#111",
    padding: "10px",
  }}
/>


        </div>
      </div>
    </div>
  );
};

export default TextCustomizer;
