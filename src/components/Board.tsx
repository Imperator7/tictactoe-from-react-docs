import calculateWinner from '../calculateWinner'
import {
  type PlayerTurn,
  type Mark,
  type gameResult,
} from '../types/board.type'
import Square from './Square'
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'

type BoardProps = {
  turn: PlayerTurn
  setTurn: Dispatch<SetStateAction<PlayerTurn>>
  setGameStage: Dispatch<SetStateAction<gameResult>>
}

export default function Board({ turn, setTurn, setGameStage }: BoardProps) {
  const [marks, setMarks] = useState<Mark[]>(Array(9).fill(null))
  const [clickable, setClickable] = useState<boolean>(true)

  useEffect(() => {
    const res = calculateWinner(marks)
    const isDraw = !res && !marks.includes(null)

    if (res) {
      setClickable(false)
      if (res.winner === 'X') {
        setGameStage('X_Win')
      } else {
        setGameStage('O_Win')
      }
      return
    }

    if (isDraw) {
      setClickable(false)
      setGameStage('Tied')
    }
  }, [marks])

  function setMark(index: number): boolean {
    if (marks[index] !== null) return false

    const nextMarks = [...marks]
    nextMarks[index] = turn
    setMarks(nextMarks)

    return true
  }

  return (
    <>
      {[0, 1, 2].map((r) => (
        <div key={r} className="board-row">
          {[0, 1, 2].map((box) => {
            const boxIndex = r * 3 + box
            return (
              <Square
                key={`${boxIndex}`}
                setTurn={setTurn}
                setMark={setMark}
                mark={marks[boxIndex]}
                boxIndex={boxIndex}
                clickable={clickable}
              />
            )
          })}
        </div>
      ))}
    </>
  )
}
