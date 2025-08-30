import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import { type Player } from '../App'

type SquareProps = {
  turn: Player
  setTurn: Dispatch<SetStateAction<Player>>
}

export default function Square({ turn, setTurn }: SquareProps) {
  const [mark, setMark] = useState<Player>('')

  const handleSquareClick = () => {
    setMark(turn)

    setTurn(turn === 'X' ? 'O' : 'X')
  }

  return (
    <button className="square" onClick={handleSquareClick}>
      {mark}
    </button>
  )
}
