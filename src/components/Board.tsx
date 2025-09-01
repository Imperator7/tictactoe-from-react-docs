import calculateWinner from '../calculateWinner'
import {
  type PlayerTurn,
  type Mark,
  type gameResult,
} from '../types/board.type'
import Square from './Square'
import {
  useEffect,
  useState,
  useMemo,
  type Dispatch,
  type SetStateAction,
} from 'react'

type BoardProps = {
  turn: PlayerTurn
  setTurn: Dispatch<SetStateAction<PlayerTurn>>
  setGameStage: Dispatch<SetStateAction<gameResult>>
  resetGame: boolean
  setResetGame: Dispatch<SetStateAction<boolean>>
}

export default function Board({
  turn,
  setTurn,
  setGameStage,
  resetGame,
  setResetGame,
}: BoardProps) {
  const [marks, setMarks] = useState<Mark[]>(Array(9).fill(null))
  const [clickable, setClickable] = useState<boolean>(true)

  const cachedGameResult = useMemo(() => calculateWinner(marks), [marks])

  useEffect(() => {
    const winner = cachedGameResult?.winner
    const isDraw = !winner && !marks.includes(null)

    if (winner) {
      setClickable(false)
      if (winner === 'X') {
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

  useEffect(() => {
    setMarks(Array(9).fill(null))
    setTurn('X')
    setGameStage(null)
    setClickable(true)
    setResetGame(false)
  }, [resetGame])

  function setMark(index: number): boolean {
    if (marks[index] !== null) return false

    const nextMarks = [...marks]
    nextMarks[index] = turn
    setMarks(nextMarks)

    return true
  }

  function highlightedButton(index: number): boolean {
    if (cachedGameResult?.line?.includes(index)) {
      return true
    }
    return false
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
                highlight={highlightedButton(boxIndex)}
              />
            )
          })}
        </div>
      ))}
    </>
  )
}
