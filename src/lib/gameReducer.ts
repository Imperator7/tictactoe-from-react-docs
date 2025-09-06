import {
  type GameState,
  type GameAction,
  type Board,
  type Player,
} from '../types'
import getGameStage from './getGameStage'

function putMark(board: Board, turn: Player, index: number): Board | null {
  const targetBox = board[index]
  if (targetBox !== null) return null

  const newBoard = [...board]
  newBoard[index] = turn
  return newBoard
}

function handleMark(state: GameState, markAt: number) {
  const gameStage = getGameStage(state.history, state.currentMove)
  if (gameStage.status !== 'ongoing') return state

  const currentBoard = state.history[state.currentMove]
  const currentTurn = state.currentMove % 2 === 0 ? 'X' : 'O'

  const newBoard = putMark(currentBoard, currentTurn, markAt)
  if (newBoard === null) {
    return state
  }

  const newHistory = state.history.slice(0, state.currentMove + 1)
  newHistory.push(newBoard)
  const newState = {
    history: newHistory,
    currentMove: state.currentMove + 1,
  }

  return newState
}

function handleJump(state: GameState, jumpTo: number) {
  const newState = { ...state, currentMove: jumpTo }
  console.log(newState)
  return newState
}

function handleReset() {
  return { history: [Array(9).fill(null)], currentMove: 0 }
}

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'mark':
      return handleMark(state, action.payload.markAt)
    case 'jump':
      return handleJump(state, action.payload.jumpTo)
    case 'reset':
      return handleReset()
    default:
      return state
  }
}
