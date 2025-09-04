import { useEffect, useState, useMemo } from 'react'
import Board from './Board'
import type { GameInfo, Mark } from '../types/board.type'
import calculateWinner from '../calculateWinner'

export default function Game() {
  const [history, setHistory] = useState<Mark[][]>([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)

  const [gameAnnouncement, setGameAnnouncement] = useState<string>()
  const [toggleShowHistory, setToggleShowHistory] = useState(false)

  const gameResult: GameInfo = useMemo(() => {
    return calculateWinner(history[-1])
  }, [history])

  const turn = currentMove % 2 === 0 ? 'X' : 'O'

  useEffect(() => {
    if (gameResult?.gameEnd) {
      if (gameResult.winner === 'X') {
        setGameAnnouncement('The winner is player X.')
      } else if (gameResult.winner === 'O') {
        setGameAnnouncement('The winner is player O.')
      }
    } else
      setGameAnnouncement(
        currentMove !== 0
          ? `Current turn: player ${turn}`
          : `Welcome to the game, the first player is X`
      )
  }, [history, turn, currentMove])

  const handleHistorySelect = (move: number) => {
    setCurrentMove(move)
  }

  const handlePlayAgain = () => {
    setGameStage(null)
    setHistory([Array(9).fill(null)])
    setCurrentMove(0)
  }

  const isEnd = gameStage === null
  return (
    <div className="w-full max-w-100">
      <h2 className="text-xl !m-2 font-semibold">{gameAnnouncement}</h2>
      <div>
        <Board
          turn={turn}
          setGameStage={setGameStage}
          history={history}
          setHistory={setHistory}
          currentMove={currentMove}
          setCurrentMove={setCurrentMove}
          gameResult={gameResult}
        />
        <br />
        <div className="flex items-start justify-between px-3">
          <div>
            <button
              onClick={handlePlayAgain}
              className="px-5 py-2 my-1 bg-green-700 text-white font-bold rounded-lg"
            >
              {isEnd ? 'Restart' : 'Play again'}
            </button>
          </div>
          <div className="flex flex-col items-end">
            <button
              className="px-5 py-2 my-1 bg-amber-400 rounded-lg text-white font-bold"
              onClick={() => {
                setToggleShowHistory(!toggleShowHistory)
              }}
            >
              {toggleShowHistory ? 'Close history' : 'Show history'}
            </button>
            {toggleShowHistory && (
              <ul className="flex flex-col  items-end gap-2 my-3">
                {history.map((_round, index) => (
                  <li key={index}>
                    {
                      <button
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={() => handleHistorySelect(index)}
                      >
                        {index !== 0
                          ? `Go to move ${index}`
                          : `Go to game start`}
                      </button>
                    }
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
