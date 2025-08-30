import type { Dispatch, SetStateAction } from 'react'
import { type MarkType, type PlayerTurn } from '../types/board.type'

type SquareProps = {
  turn: PlayerTurn
  mark: MarkType
  setTurn: Dispatch<SetStateAction<PlayerTurn>>
  setMark: (index: number) => void
  boxIndex: number
}

export default function Square({
  turn,
  setTurn,
  mark,
  setMark,
  boxIndex,
}: SquareProps) {
  const handleSquareClick = () => {
    setMark(boxIndex)
    setTurn(turn === 'X' ? 'O' : 'X')
  }

  return (
    <button className="square" onClick={handleSquareClick}>
      {mark}
    </button>
  )
}
