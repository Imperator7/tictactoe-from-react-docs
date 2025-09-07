import { useRef, useState } from 'react'
import { type Mark } from '../types/board.type'

type SquareProps = {
  mark: Mark
  boxIndex: number
  clickable: boolean
  highlight: string
  handlePlaceMark: (markAt: number) => void
}

type Ripple = { id: number; x: number; y: number; R: number }

export default function Square({
  mark,
  boxIndex,
  clickable,
  highlight,
  handlePlaceMark,
}: SquareProps) {
  const [ripples, setRipples] = useState<Ripple[]>([])

  const rippleId = useRef(0)

  const addRipple = (e: React.PointerEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = Math.round(e.clientX - r.left)
    const y = Math.round(e.clientY - r.top)

    const R = Math.ceil(Math.min(r.width, r.height))
    const id = rippleId.current++
    setRipples((rs) => [...rs, { id, x, y, R }])

    setTimeout(() => setRipples((rs) => rs.filter((rp) => rp.id !== id)), 1000)

    if (navigator.vibrate) navigator.vibrate(8)
  }

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
        `focus:${highlight === 'bg-slate-200' ? 'bg-slate-300' : ''}`,
        'relative',
      ].join(' ')}
      onPointerDown={addRipple}
      onClick={handleBoxClick}
      style={{
        borderRadius: cornerByIndex(boxIndex),
      }}
    >
      <span className="pointer-events-none absolute inset-0 z-10">
        {ripples.map((r) => (
          <span
            key={r.id}
            className="ripple"
            style={{
              ['--x' as string]: `${r.x}px`,
              ['--y' as string]: `${r.y}px`,
              ['--R' as string]: `${r.R}px`,
            }}
          />
        ))}
      </span>

      {mark}
    </button>
  )
}
