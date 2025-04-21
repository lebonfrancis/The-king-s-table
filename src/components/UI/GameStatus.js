import React from 'react';
import styled from 'styled-components';
import { useGame } from '../../game/GameContext';

const StatusContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.7);
  padding: 15px;
  border-radius: 10px;
  border: 2px solid gold;
  font-family: 'MedievalSharp', cursive;
  color: white;
`;

const TurnIndicator = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  
  span {
    margin-left: 10px;
    color: ${props => props.color === 'w' ? '#ffcc00' : '#aa00ff'};
    text-shadow: 0 0 5px ${props => props.color === 'w' ? 'gold' : 'purple'};
  }
`;

export function GameStatus() {
  const { state } = useGame();
  
  return (
    <StatusContainer>
      <TurnIndicator color={state.turn}>
        Current Turn: 
        <span>{state.turn === 'w' ? 'Solar Alliance' : 'Shadow Legion'}</span>
      </TurnIndicator>
      <div>Game Status: {state.gameStatus}</div>
    </StatusContainer>
  );
}
