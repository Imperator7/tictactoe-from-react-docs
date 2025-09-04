import type { Dispatch, SetStateAction } from 'react'
import { type Mark, type PlayerTurn } from '../types/board.type'

type SquareProps = {
  mark: Mark
  setTurn: Dispatch<SetStateAction<PlayerTurn>>
  setMark: (index: number) => boolean
  boxIndex: number
  clickable: boolean
  highlight: boolean
}

export default function Square({
  setTurn,
  mark,
  setMark,
  boxIndex,
  clickable,
  highlight,
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
      className="w-[30vw] h-[30vw] border text-6xl font-bold"
      onClick={handleSquareClick}
      style={{
        borderRadius: cornerByIndex(boxIndex),
        backgroundColor: `${(highlight && 'gold') || ''}`,
      }}
    >
      {mark}
    </button>
  )
}
