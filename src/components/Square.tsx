import type { Dispatch, SetStateAction } from 'react'
import { type MarkType, type PlayerTurn } from '../types/board.type'

type SquareProps = {
  mark: MarkType
  setTurn: Dispatch<SetStateAction<PlayerTurn>>
  setMark: (index: number) => boolean
  boxIndex: number
  clickable: boolean
}

export default function Square({
  setTurn,
  mark,
  setMark,
  boxIndex,
  clickable,
}: SquareProps) {
  const handleSquareClick = () => {
    if (!clickable) return

    const res: boolean = setMark(boxIndex)

    if (!res) return
    setTurn((prev) => (prev === 'X' ? 'O' : 'X'))
  }

  const cornerByIndex = (index: number): string => {
    const borderRadius = 4
    if (index === 0) return `${borderRadius}px 0 0 0`
    if (index === 2) return `0 ${borderRadius}px 0 0`
    if (index === 6) return `0 0 0 ${borderRadius}px`
    if (index === 8) return `0 0 ${borderRadius}px 0`

    return '0px'
  }

  return (
    <button
      className="square"
      onClick={handleSquareClick}
      style={{
        borderRadius: cornerByIndex(boxIndex),
      }}
    >
      {mark}
    </button>
  )
}
