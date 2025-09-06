import type { Board, GameState, Player } from '../types'
import getGameStage from './getGameStage'

export function currentBoard(state: GameState): Board {
  return state.history[state.currentMove]
}

export function currentTurn(state: GameState): Player {
  return state.currentMove % 2 === 0 ? 'X' : 'O'
}

export function gameStatus(state: GameState) {
  return getGameStage(state.history, state.currentMove)
}
