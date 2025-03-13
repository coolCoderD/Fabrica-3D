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


export const getFashionRecommendation = async (hexCode) => {
  const model=genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `
    The user is wearing a T-shirt of color ${hexCode}. Suggest a stylish, color-coordinated outfit that complements this color. 
    Return the response in strict JSON format with the following structure:
    
    {
      "bottom_wear": {
        "item": "Example",
        "reason": "Example reason"
      },
      "footwear": {
        "item": "Example",
        "reason": "Example reason"
      },
      "accessories": [
        {
          "item": "Example",
          "reason": "Example reason"
        }
      ]
    }
    
    Only return valid JSON. No extra text.
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
