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
  history,
  setHistory,
  currentMove,
  setCurrentMove,
}: BoardProps) {
  const [marks, setMarks] = useState<Mark[]>(Array(9).fill(null))
  const [clickable, setClickable] = useState<boolean>(true)

  const gameResult = useMemo(() => {
    return calculateWinner(marks)
  }, [marks])

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
    setHistory([Array(9).fill(null)])
    setCurrentMove(0)
    setResetGame(false)
  }, [
    resetGame,
    setTurn,
    setGameStage,
    setResetGame,
    setHistory,
    setCurrentMove,
  ])

  useEffect(() => {
    setMarks(history[currentMove])
  }, [currentMove, history])

  function setMark(index: number): boolean {
    if (marks[index] !== null) return false
    // setHasStarted(true)
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
    <div className="grid grid-cols-3 gap-0 max-w-96 sm:max-w-sm md:max-w-md mx-auto">
      {marks.map((mark, index) => {
        return (
          <Square
            key={`${index}`}
            setTurn={setTurn}
            setMark={setMark}
            mark={mark}
            boxIndex={index}
            clickable={clickable}
            highlight={highlightedButton(index)}
          />
        )
      })}
    </div>
  )
}
