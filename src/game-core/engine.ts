import type {
  Board,
  GameState,
  Player,
  BoardHistory,
  Mark,
  GameStatus,
  WinnerInfo,
} from '../types'

export const initialState = (): GameState => ({
  history: [Array(9).fill(null)],
  currentMove: 0,
})
export function currentBoard(state: GameState): Board {
  return state.history[state.currentMove]
}
export function currentTurn(state: GameState): Player {
  return state.currentMove % 2 === 0 ? 'X' : 'O'
}

export function putMark(
  board: Board,
  turn: Player,
  index: number
): Board | null {
  const targetBox = board[index]
  if (targetBox !== null) return null

  const newBoard = [...board]
  newBoard[index] = turn
  return newBoard
}

export function handleMark(state: GameState, markAt: number) {
  const gameStage = getGameStatus(state.history, state.currentMove)
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

export function handleJump(state: GameState, jumpTo: number) {
  const newState = { ...state, currentMove: jumpTo }
  console.log(newState)
  return newState
}

export function handleReset() {
  return initialState()
}

export function calculateWinner(board: Mark[]): WinnerInfo | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ] as const

  for (const [a, b, c] of lines) {
    if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] }
    }
  }

  return null
}

export function getGameStatus(
  history: BoardHistory,
  currentMove: number
): GameStatus {
  const currentBoard = history[currentMove]
  if (!currentBoard) throw new Error('Invalid currentMove')

  const res = calculateWinner(currentBoard)

  if (res === null) {
    if (currentMove >= 9) {
      return { status: 'tie' }
    }

    return { status: 'ongoing' }
  } else {
    return { status: 'end', winner: res.winner, line: res.line }
  }
}
