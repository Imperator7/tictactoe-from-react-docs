import { useState } from 'react'
import Board from './components/Board'
import type { PlayerTurn } from './types/board.type'
import './App.css'

function App() {
  const [turn, setTurn] = useState<PlayerTurn>('X')

  return (
    <>
      <h4>Next Player: {turn}</h4>
      <Board turn={turn} setTurn={setTurn} />
    </>
  )
}

export default App
