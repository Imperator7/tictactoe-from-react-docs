import { type Mark } from '../types/board.type'

type SquareProps = {
  mark: Mark
  boxIndex: number
  clickable: boolean
  highlight: string
  handlePlaceMark: (markAt: number) => void
}

export default function Square({
  mark,
  boxIndex,
  clickable,
  highlight,
  handlePlaceMark,
}: SquareProps) {
  const handleBoxClick = () => {
    if (clickable === false) return
    handlePlaceMark(boxIndex)
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
      className={[
        `${mark === 'X' ? 'text-red-500' : ''}`,
        `${mark === 'O' ? 'text-blue-500' : ''}`,
        'w-full aspect-square text-6xl font-bold border border-black',
        `${highlight}`,
        'transition-transform duration-250 ease-out select-none',
        'hover:scale-110 active:scale-85 hover:z-50',
        `focus:${highlight === 'bg-slate-200' ? 'bg-slate-300' : ''} `,
      ].join(' ')}
      onClick={handleBoxClick}
      style={{
        borderRadius: cornerByIndex(boxIndex),
      }}
    >
      {mark}
    </button>
  )
}
