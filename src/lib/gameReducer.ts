import { type GameState, type GameAction } from '../types'
import { handleMark, handleJump, handleReset } from '../game-core/engine'

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
