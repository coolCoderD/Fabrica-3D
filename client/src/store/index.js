import { proxy } from 'valtio';

const state = proxy({
  intro: true,
  color: '#EFBD48',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: './threejs.png',
  fullDecal: './threejs.png',
  selectedMask: 'square',
  customText: '',       
  textSize: 48,          
  textColor: '#000000',   
  textPosition: { x: 0, y: -0.22 }, 
});

export default state;