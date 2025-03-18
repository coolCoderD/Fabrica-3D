import React from 'react'
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import circle from '../assets/Circle.png'
import square from '../assets/Square.png'
import star from '../assets/Start.png'
import heart from '../assets/Heart.png'
import state from '../store';
import * as THREE from 'three';
import { useEffect, useState } from 'react';




const Shirt = () => {
  const masks = {
    circle: useTexture(circle),
    square: useTexture(square),
    star: useTexture(star),
    heart: useTexture(heart)
  };
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/shirt_baked.glb');

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);
  const alphaMask = masks[snap.selectedMask];
  const [textMaterial, setTextMaterial] = useState(null);

  const material = new THREE.MeshStandardMaterial({
    map: logoTexture,
    alphaMap: alphaMask,
    transparent: true,
  });


  // Function to create a custom material for the text
  const createTextMaterial = (text, size, color) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 512;
    canvas.height = 256;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set text styles
    ctx.fillStyle = color; 
    ctx.font = `Bold ${size}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    // Convert to texture
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    return new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
    });
  };

  useEffect(() => {
    if (snap.customText) {
      setTextMaterial(createTextMaterial(snap.customText, snap.textSize, snap.textColor));
    }else{
      setTextMaterial(null);
    }
  }, [snap.customText, snap.textSize, snap.textColor]);

  console.log(snap.textPosition.y)



  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >


        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.20}
            map={logoTexture}
            material={material}
          />
        )}

{textMaterial && (
          <mesh position={[snap.textPosition.x * 0.5, snap.textPosition.y * 0.5, 0.2]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.4, 0.2]} />
          <meshStandardMaterial {...textMaterial} />
        </mesh>
        )}

    


      </mesh>


    </group>
  )
}

export default Shirt