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
    <>
      <h4>{gameAnnouncement}</h4>
      <div style={{ display: 'flex' }}>
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
            <button onClick={handlePlayAgain}>Play again</button>
          ) : (
            ''
          )}
        </div>
        <div>
          <ul style={{ listStyle: 'none', margin: '0 24px', padding: '0' }}>
            {history.map((_round, index) => (
              <li key={index} style={{ margin: '2px' }}>
                {index !== 0 ? (
                  <button onClick={() => handleHistorySelect(index)}>
                    Go to move #{index}
                  </button>
                ) : (
                  <button onClick={() => handleHistorySelect(index)}>
                    Go to game start
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
