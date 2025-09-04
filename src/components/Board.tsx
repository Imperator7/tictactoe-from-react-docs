import {
  type PlayerTurn,
  type Mark,
  type GameResult,
  type GameInfo,
} from '../types/board.type'
import Square from './Square'
import { useEffect, type Dispatch, type SetStateAction } from 'react'

type BoardProps = {
  turn: PlayerTurn
  setGameStage: Dispatch<SetStateAction<GameResult>>
  history: Mark[][]
  setHistory: Dispatch<SetStateAction<Mark[][]>>
  currentMove: number
  setCurrentMove: Dispatch<SetStateAction<number>>
  gameResult: GameInfo
}

export default function Board({
  turn,
  setGameStage,
  history,
  setHistory,
  currentMove,
  setCurrentMove,
  gameResult,
}: BoardProps) {
  const marks = history[currentMove]

  useEffect(() => {
    const winner = gameResult?.winner
    const isDraw = !winner && !marks.includes(null)

    if (winner) {
      if (winner === 'X') {
        setGameStage('X_Win')
      } else {
        setGameStage('O_Win')
      }
      return
    }

    if (isDraw) {
      setGameStage('Tied')
    }
  }, [gameResult, marks, setGameStage])

  function setMark(index: number): boolean {
    if (marks[index] !== null) return false
    // setHasStarted(true)
    setCurrentMove((prev) => prev + 1)

    const nextMarks = [...marks]
    nextMarks[index] = turn
    setHistory((prev) => {
      const newPrev = [...prev]
      newPrev.splice(currentMove + 1)
      newPrev.push(nextMarks)
      return newPrev
    })
    return true
  }

  function highlightedButton(index: number): boolean {
    return gameResult?.line?.includes(index) ?? false
  }

  return (
    <div className="grid grid-cols-3 gap-0 max-w-96 sm:max-w-sm md:max-w-md mx-auto">
      {marks.map((mark, index) => {
        return (
          <Square
            key={`${index}`}
            setMark={setMark}
            mark={mark}
            boxIndex={index}
            clickable={gameResult !== null}
            highlight={highlightedButton(index)}
          />
        )
      })}
    </div>
  )
}
