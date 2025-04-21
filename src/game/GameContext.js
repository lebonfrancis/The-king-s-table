import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Chess } from 'chess.js';

const GameContext = createContext();

const initialState = {
  game: new Chess(),
  selectedSquare: null,
  possibleMoves: [],
  turn: 'w',
  gameStatus: 'active',
  capturedPieces: { w: [], b: [] },
  animations: [],
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'SELECT_SQUARE':
      return {
        ...state,
        selectedSquare: action.square,
        possibleMoves: action.possibleMoves,
      };
    case 'MOVE_PIECE':
      return {
        ...state,
        game: action.newGame,
        selectedSquare: null,
        possibleMoves: [],
        turn: action.newGame.turn(),
        capturedPieces: action.capturedPieces,
        animations: [...state.animations, action.animation],
      };
    case 'CLEAR_ANIMATION':
      return {
        ...state,
        animations: state.animations.filter((_, i) => i !== action.index),
      };
    case 'RESET_GAME':
      return {
        ...initialState,
        game: new Chess(),
      };
    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
