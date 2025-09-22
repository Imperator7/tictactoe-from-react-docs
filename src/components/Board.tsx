import type { GameStatus, Board } from '../types/board.type'
import Square from './Square'

type BoardProps = {
  marks: Board
  handlePlaceMark: (martAt: number) => void
  gameStage: GameStatus
}

export default function Board({
  marks,
  handlePlaceMark,
  gameStage,
}: BoardProps) {
  function highlightedButton(index: number): string {
    if (gameStage.status === 'ongoing')
      return 'bg-slate-200/20 backdrop-blur-[2px]'
    if (gameStage.status === 'tie') return 'bg-amber-300/30 backdrop-blur-[2px]'
    return gameStage?.line?.includes(index)
      ? 'bg-lime-500/90 backdrop-blur-[0px]'
      : 'bg-slate-200/20 backdrop-blur-[2px]'
  }

  return (
    <div className="grid grid-cols-3 gap-0 my-2 sm:max-w-sm md:max-w-md mx-auto">
      {marks.map((mark, index) => {
        return (
          <Square
            key={`${index}`}
            mark={mark}
            boxIndex={index}
            clickable={gameStage.status === 'ongoing'}
            highlight={highlightedButton(index)}
            handlePlaceMark={handlePlaceMark}
          />
        )
      })}
    </div>
  )
}
