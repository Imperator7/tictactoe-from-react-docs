export type GameAction =
  | {
      type: 'mark'
      payload: {
        markAt: number
      }
    }
  | {
      type: 'jump'
      payload: {
        jumpTo: number
      }
    }
  | { type: 'reset' }
