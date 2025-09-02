import { useEffect, useState } from 'react'
import Board from './components/Board'
import type { gameResult, Mark, PlayerTurn } from './types/board.type'
import './App.css'

function App() {
  const [history, setHistory] = useState<Mark[][]>([])
  const [turn, setTurn] = useState<PlayerTurn>('X')
  const [gameStage, setGameStage] = useState<gameResult>(null)
  const [gameAnnouncement, setGameAnnouncement] = useState<string>()
  const [resetGame, setResetGame] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (gameStage === 'X_Win') {
      setGameAnnouncement('The winner is player X.')
    } else if (gameStage === 'O_Win') {
      setGameAnnouncement('The winner is player O.')
    } else if (gameStage === 'Tied') {
      setGameAnnouncement('The game is tied, let try again.')
    } else
      setGameAnnouncement(
        hasStarted
          ? `Current turn: player ${turn}`
          : `Welcome to the game, the first player is X`
      )
  }, [turn, gameStage, hasStarted])

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
