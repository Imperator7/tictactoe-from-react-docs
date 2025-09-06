import type { Mark, GameStatus } from '../types/board.type'

export default function getGameStatus(board: Mark[]): GameStatus {
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
      return { status: 'end', winner: board[a], line: [a, b, c] }
    }
  }

  if (board.every((mark) => mark !== null)) return { status: 'tie' }

  return { status: 'ongoing' }
}
