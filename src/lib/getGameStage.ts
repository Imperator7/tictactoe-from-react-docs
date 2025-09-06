import type { BoardHistory, GameStatus } from '../types/board.type'
import getGameStatus from './getGameStatus'

export default function getGameStage(
  history: BoardHistory,
  currentMove: number
): GameStatus {
  const currentBoard = history[currentMove]
  if (!currentBoard) throw new Error('Invalid currentMove')

  const status = getGameStatus(currentBoard)
  return status
}
