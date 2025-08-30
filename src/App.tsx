import { useState } from 'react'
import Board from './components/Board'
import './App.css'

export type Player = 'X' | 'O' | ''

function App() {
  const [turn, setTurn] = useState<Player>('X')

  return (
    <>
      <h4>Next Player: {turn}</h4>
      <Board turn={turn} setTurn={setTurn} />
    </>
  )
}

export default App
