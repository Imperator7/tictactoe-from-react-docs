import { useEffect, useState } from 'react'
import Board from './components/Board'
import type { gameResult, PlayerTurn } from './types/board.type'
import './App.css'

function App() {
  const [turn, setTurn] = useState<PlayerTurn>('X')
  const [gameStage, setGameStage] = useState<gameResult>(null)
  const [gameAnnouncement, setGameAnnouncement] = useState<string>(
    'Welcome to the game, the first player is X'
  )
  const [resetGame, setResetGame] = useState(false)

  useEffect(() => {
    setGameAnnouncement(`Current turn: player ${turn}`)
  }, [turn])

  useEffect(() => {
    if (gameStage === 'X_Win') {
      setGameAnnouncement('The winner is player X.')
    }
    if (gameStage === 'O_Win') {
      setGameAnnouncement('The winner is player O.')
    }
    if (gameStage === 'Tied') {
      setGameAnnouncement('The game is tied, let try again.')
    }
  }, [gameStage])

  return (
    <>
      <h4>{gameAnnouncement}</h4>
      <Board
        turn={turn}
        setTurn={setTurn}
        setGameStage={setGameStage}
        resetGame={resetGame}
        setResetGame={setResetGame}
      />
      <br />
      {gameStage !== null ? (
        <button onClick={() => setResetGame(true)}>Play again</button>
      ) : (
        ''
      )}
    </>
  )
}

export default App
