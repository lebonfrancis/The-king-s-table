import React from 'react';
import { MeshStandardMaterial } from 'three';

export function Square({ position, color, onClick, highlighted, children }) {
  const material = new MeshStandardMaterial({ 
    color: highlighted ? (color === 'white' ? 0xaaaaaa : 0x444444) : (color === 'white' ? 0xf0d9b5 : 0xb58863),
    roughness: 0.8,
    metalness: 0.2
  });

  return (
    <group position={position} onClick={onClick}>
      <mesh receiveShadow>
        <boxGeometry args={[1, 0.1, 1]} />
        {material}
      </mesh>
      {children}
    </group>
  );
}
