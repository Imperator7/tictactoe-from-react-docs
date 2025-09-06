import type { GameAction, GameState } from '../src/types'
import { gameReducer } from './../src/lib/gameReducer'
import { useReducer } from 'react'

export default function useTicTacToe(): [
  GameState,
  React.Dispatch<GameAction>
] {
  const initialHistory = {
    history: [Array(9).fill(null)],
    currentMove: 0,
  }

  const [gameState, dispatch] = useReducer(gameReducer, initialHistory)

  return [gameState, dispatch]
}
