import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGame } from '../../game/GameContext';

export function SpellEffects() {
  const { state } = useGame();
  const effectsRef = useRef([]);
  
  useFrame(({ scene }) => {
    effectsRef.current.forEach((effect, index) => {
      if (effect) {
        effect.time += 0.05;
        if (effect.time > 1) {
          scene.remove(effect.mesh);
          effectsRef.current[index] = null;
        } else {
          effect.mesh.scale.setScalar(effect.time * 2);
          effect.mesh.material.opacity = 1 - effect.time;
        }
      }
    });
  });

  useEffect(() => {
    if (state.animations.length > 0) {
      const latestAnim = state.animations[state.animations.length - 1];
      
      if (latestAnim.type === 'capture') {
        // Create a capture effect
        const geometry = new THREE.SphereGeometry(0.5, 16, 16);
        const material = new THREE.MeshBasicMaterial({
          color: latestAnim.piece === 'w' ? 0xff0000 : 0x0000ff,
          transparent: true,
          opacity: 0.8
        });
        const mesh = new THREE.Mesh(geometry, material);
        
        const [file, rank] = latestAnim.to.split('');
        const x = file.charCodeAt(0) - 97;
        const z = 8 - parseInt(rank);
        
        mesh.position.set(x + 0.5, 1, z + 0.5);
        effectsRef.current.push({ mesh, time: 0 });
      }
    }
  }, [state.animations]);

  return null;
}
