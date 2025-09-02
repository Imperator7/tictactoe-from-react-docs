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
  type RefObject,
} from 'react'

type BoardProps = {
  turn: PlayerTurn
  setTurn: Dispatch<SetStateAction<PlayerTurn>>
  setGameStage: Dispatch<SetStateAction<gameResult>>
  resetGame: boolean
  setResetGame: Dispatch<SetStateAction<boolean>>
  hasStartedRef: RefObject<boolean>
  history: Mark[][]
  setHistory: Dispatch<SetStateAction<Mark[][]>>
  currentMove: number
  setCurrentMove: Dispatch<SetStateAction<number>>
}

export default function Board({
  turn,
  setTurn,
  setGameStage,
  resetGame,
  setResetGame,
  hasStartedRef,
  history,
  setHistory,
  currentMove,
  setCurrentMove,
}: BoardProps) {
  const [marks, setMarks] = useState<Mark[]>(Array(9).fill(null))
  const [clickable, setClickable] = useState<boolean>(true)

  const gameResult = useMemo(() => calculateWinner(marks), [marks])

  useEffect(() => {
    const winner = gameResult?.winner
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
  }, [gameResult, marks, setGameStage])

  useEffect(() => {
    setMarks(Array(9).fill(null))
    setTurn('X')
    setGameStage(null)
    setClickable(true)
    setResetGame(false)
  }, [resetGame, setTurn, setGameStage, setResetGame])

  useEffect(() => {
    setMarks(history[currentMove])
  }, [currentMove, history])

  function setMark(index: number): boolean {
    if (marks[index] !== null) return false
    // setHasStarted(true)
    if (currentMove === 0) {
      hasStartedRef.current = true
    }
    setCurrentMove((prev) => prev + 1)

    const nextMarks = [...marks]
    nextMarks[index] = turn
    setMarks(nextMarks)

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
