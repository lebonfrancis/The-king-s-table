import React, { useRef, useEffect } from 'react';
import { useGame } from '../../game/GameContext';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Square } from './Square';
import { BoardGeometry } from './BoardGeometry';

export function ChessBoard() {
  const boardRef = useRef();
  const { state, dispatch } = useGame();
  const { selectedSquare, possibleMoves } = state;

  // Handle square selection and moves
  const handleSquareClick = (square) => {
    const piece = state.game.get(square);
    
    // If it's the current player's turn and they click their own piece
    if (piece && piece.color === state.turn) {
      const moves = state.game.moves({
        square,
        verbose: true
      }).map(move => move.to);
      dispatch({ type: 'SELECT_SQUARE', square, possibleMoves: moves });
    } 
    // If a square is selected and the clicked square is a valid move
    else if (selectedSquare && possibleMoves.includes(square)) {
      const move = state.game.move({
        from: selectedSquare,
        to: square,
        promotion: 'q' // Default to queen for simplicity
      });
      
      if (move) {
        const newGame = new Chess(state.game.fen());
        const captured = move.captured 
          ? { ...state.capturedPieces, [move.color]: [...state.capturedPieces[move.color], move.captured] }
          : state.capturedPieces;
        
        dispatch({ 
          type: 'MOVE_PIECE', 
          newGame, 
          capturedPieces: captured,
          animation: {
            type: move.captured ? 'capture' : 'move',
            from: selectedSquare,
            to: square,
            piece: move.piece
          }
        });
      }
    }
  };

  return (
    <group ref={boardRef} position={[-3.5, 0, -3.5]}>
      <BoardGeometry />
      {Array(8).fill().map((_, i) => (
        Array(8).fill().map((_, j) => {
          const square = String.fromCharCode(97 + j) + (8 - i);
          const isSelected = selectedSquare === square;
          const isPossibleMove = possibleMoves.includes(square);
          const piece = state.game.get(square);
          
          return (
            <Square
              key={square}
              position={[j, 0, i]}
              color={(i + j) % 2 === 0 ? 'white' : 'black'}
              onClick={() => handleSquareClick(square)}
              highlighted={isSelected || isPossibleMove}
            >
              {piece && (
                <ChessPiece
                  type={piece.type}
                  color={piece.color}
                  square={square}
                  isSelected={isSelected}
                />
              )}
            </Square>
          );
        })
      ))}
    </group>
  );
}
