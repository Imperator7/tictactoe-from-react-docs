export type Player = 'X' | 'O'
export type Mark = Player | null
export type Board = Mark[]
export type BoardHistory = Board[]
export type Line = readonly [number, number, number]

export type GameStatus =
  | { status: 'end'; winner: Player; line: Line }
  | { status: 'tie' }
  | { status: 'ongoing' }

export type GameState = {
  history: BoardHistory
  currentMove: number
}
