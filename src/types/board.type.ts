export type Mark = 'X' | 'O' | null
export type PlayerTurn = 'X' | 'O'
export type gameResult = 'Tied' | 'X_Win' | 'O_Win' | null
export type WinInfo = {
  winner: PlayerTurn
  line: [number, number, number]
}
