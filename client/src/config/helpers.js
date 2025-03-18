import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";



const genAI = new GoogleGenerativeAI("AIzaSyAwj0HyxB3A6HijMvz3zG1AGQBDLo_CcA4");

export const reader = (file) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.readAsDataURL(file);
  });

export const getContrastingColor = (color) => {
  // Remove the '#' character if it exists
  const hex = color.replace("#", "");

  // Convert the hex string to RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate the brightness of the color
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return black or white depending on the brightness
  return brightness > 128 ? "black" : "white";
};


function getColorName(hexCode) {
  const colors = {
      "#000000": "Black",
      "#FFFFFF": "White",
      "#FF0000": "Red",
      "#00FF00": "Green",
      "#0000FF": "Blue",
      "#FFFF00": "Yellow",
      "#FFA500": "Orange",
      "#800080": "Purple",
      "#FFC0CB": "Pink",
      "#A52A2A": "Brown",
      "#808080": "Gray",
      "#00FFFF": "Cyan",
      "#008080": "Teal",
      "#FFD700": "Gold",
      "#C0C0C0": "Silver",
      "#4B0082": "Indigo",
      "#D2691E": "Chocolate",
      "#DC143C": "Crimson"
  };

  return colors[hexCode] || "a shade close to " + hexCode; // Fallback for unknown colors
}


export const getFashionRecommendation = async (hexCode) => {
  const model=genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const colorName = getColorName(hexCode);
  const prompt = `
  You are a fashion AI expert. The user is wearing a T-shirt in ${colorName}. Suggest a **modern, stylish outfit** that complements this color using fashion principles like contrast, color harmony, and current trends.
  
  **Output JSON Format:**
  {
    "style": "Casual | Formal | Streetwear | Anime-Inspired",
    "bottom_wear": {
      "item": "Example",
      "reason": "Why it complements the T-shirt color and overall outfit"
    },
    "footwear": {
      "item": "Example",
      "reason": "Why it works with the outfit"
    },
    "accessories": [
      {
        "item": "Example",
        "reason": "How this enhances the outfit"
      }
    ]
  }
  
  **Guidelines:**
  - Ensure the outfit is **coordinated and stylish**.
  - Maintain **valid JSON format** (no markdown or extra text).
  - Choose **at least one accessory** to complete the look.
  `;
  


  try {
    const result = await model.generateContent(prompt);
    let textResponse = result.response.text(); // Get raw response

    // Remove unwanted markdown formatting (triple backticks, newlines)
    textResponse = textResponse.replace(/```json/g, "").replace(/```/g, "").trim();

    return JSON.parse(textResponse); // Convert string to JSON
  } catch (error) {
    console.error("Error fetching fashion recommendations:", error);
    return null;
  }
};
