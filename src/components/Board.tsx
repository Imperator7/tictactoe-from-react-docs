import calculateWinner from '../calculateWinner'
import { type PlayerTurn, type MarkType } from '../types/board.type'
import Square from './Square'
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'

type BoardProps = {
  turn: PlayerTurn
  setTurn: Dispatch<SetStateAction<PlayerTurn>>
  setEnd: Dispatch<SetStateAction<boolean>>
}

export default function Board({ turn, setTurn, setEnd }: BoardProps) {
  const [marks, setMarks] = useState<MarkType[]>(Array(9).fill(null))
  const [clickable, setClickable] = useState<boolean>(true)

  useEffect(() => {
    const res = calculateWinner(marks)
    if (res) {
      setClickable(false)
      setEnd(true)
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
