import { useState } from 'react'
import Board from './components/Board'
import type { PlayerTurn } from './types/board.type'
import './App.css'

function App() {
  const [turn, setTurn] = useState<PlayerTurn>('X')
  const [isEnd, setEnd] = useState<boolean>(false)

  return (
    <>
      {isEnd ? (
        <h4>The winner is {turn === 'X' ? 'O' : 'X'}</h4>
      ) : (
        <h4>Next Player: {turn}</h4>
      )}
      <Board turn={turn} setTurn={setTurn} setEnd={setEnd} />
    </>
  )
}

export default App
