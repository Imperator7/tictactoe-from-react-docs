export type Mark = 'X' | 'O' | null
export type PlayerTurn = 'X' | 'O'
export type GameInfo =
  | {
      gameEnd: true
      winner: PlayerTurn
      line: [number, number, number]
    }
  | {
      gameEnd: false
      round: number
      turn: PlayerTurn
    }
