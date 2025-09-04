import { type Mark } from '../types/board.type'

type SquareProps = {
  mark: Mark
  setMark: (index: number) => boolean
  boxIndex: number
  clickable: boolean
  highlight: boolean
}

export default function Square({
  mark,
  setMark,
  boxIndex,
  clickable,
  highlight,
}: SquareProps) {
  const handleSquareClick = () => {
    if (!clickable) return
    setMark(boxIndex)
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
      className="w-full aspect-square border text-6xl font-bold"
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
