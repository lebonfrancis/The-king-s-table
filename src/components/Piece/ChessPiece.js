import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGame } from '../../game/GameContext';

const pieceModels = {
  k: '/assets/models/king.glb',
  q: '/assets/models/queen.glb',
  r: '/assets/models/rook.glb',
  b: '/assets/models/bishop.glb',
  n: '/assets/models/knight.glb',
  p: '/assets/models/pawn.glb',
};

export function ChessPiece({ type, color, square, isSelected }) {
  const pieceRef = useRef();
  const { nodes, materials } = useGLTF(pieceModels[type]);
  const { state } = useGame();
  
  // Animation for selected piece
  useFrame(({ clock }) => {
    if (isSelected && pieceRef.current) {
      pieceRef.current.position.y = 0.5 + Math.sin(clock.getElapsedTime() * 3) * 0.1;
    }
  });

  // Convert square notation to position
  const [file, rank] = square.split('');
  const x = file.charCodeAt(0) - 97;
  const z = 8 - parseInt(rank);

  return (
    <group 
      ref={pieceRef} 
      position={[x + 0.5, 0.5, z + 0.5]}
      rotation={[0, color === 'w' ? 0 : Math.PI, 0]}
    >
      <primitive 
        object={nodes[type]} 
        material={materials[color === 'w' ? 'white' : 'black']} 
        scale={0.5}
      />
    </group>
  );
}

// Preload models
Object.values(pieceModels).forEach(useGLTF.preload);
