import { useEffect, useState } from 'react'
import Board from './components/Board'
import type { gameResult, Mark, PlayerTurn } from './types/board.type'
import './App.css'

function App() {
  const [history, setHistory] = useState<Mark[][]>([Array(9).fill(null)])
  const [turn, setTurn] = useState<PlayerTurn>('X')
  const [gameStage, setGameStage] = useState<gameResult>(null)
  const [gameAnnouncement, setGameAnnouncement] = useState<string>()
  const [resetGame, setResetGame] = useState(false)
  const [currentMove, setCurrentMove] = useState(0)

  useEffect(() => {
    if (gameStage === 'X_Win') {
      setGameAnnouncement('The winner is player X.')
    } else if (gameStage === 'O_Win') {
      setGameAnnouncement('The winner is player O.')
    } else if (gameStage === 'Tied') {
      setGameAnnouncement('The game is tied, let try again.')
    } else
      setGameAnnouncement(
        currentMove !== 0
          ? `Current turn: player ${turn}`
          : `Welcome to the game, the first player is X`
      )
  }, [turn, gameStage, currentMove])

  const handleHistorySelect = (move: number) => {
    setCurrentMove(move)
  }

  const handlePlayAgain = () => {
    setResetGame(true)
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-xl !m-2 font-semibold">{gameAnnouncement}</h2>
      <div>
        <Board
          turn={turn}
          setTurn={setTurn}
          setGameStage={setGameStage}
          resetGame={resetGame}
          setResetGame={setResetGame}
          history={history}
          setHistory={setHistory}
          currentMove={currentMove}
          setCurrentMove={setCurrentMove}
        />
        <br />
        {gameStage !== null ? (
          <button
            onClick={handlePlayAgain}
            className="px-5 py-2 bg-green-700 text-white font-bold rounded-lg"
          >
            Play again
          </button>
        ) : (
          ''
        )}

        <div>
          <ul>
            {history.map((_round, index) => (
              <li key={index}>
                {
                  <button
                    className="px-5 py-2 my-0.5 bg-blue-600 text-white font-medium 
         hover:bg-blue-700 active:bg-blue-800 
         shadow-sm hover:shadow-md active:scale-95 transition-all duration-50 ease-in"
                    onClick={() => handleHistorySelect(index)}
                  >
                    {index !== 0 ? `Go to move ${index}` : `Go to game start`}
                  </button>
                }
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
