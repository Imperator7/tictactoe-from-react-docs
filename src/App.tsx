import { useState } from 'react'
import Square from './components/Square'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Square></Square>
    </>
  )
}

export default App
