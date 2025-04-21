import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { ChessBoard } from './components/Board';
import { GameProvider } from './game/GameContext';

function App() {
  return (
    <GameProvider>
      <Canvas camera={{ position: [0, 10, 15], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Environment preset="tavern" />
        <ChessBoard />
        <OrbitControls 
          minDistance={5}
          maxDistance={20}
          enablePan={false}
        />
      </Canvas>
    </GameProvider>
  );
}

export default App;
