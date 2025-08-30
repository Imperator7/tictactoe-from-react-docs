import type { Player } from '../App'
import Square from './Square'
import { useState, type Dispatch, type SetStateAction } from 'react'

type BoardProps = {
  turn: Player
  setTurn: Dispatch<SetStateAction<Player>>
}

export default function Board({ turn, setTurn }: BoardProps) {
  const [marks, setMarks] = useState<Player[]>([
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ])

  return (
    <>
      {[0, 1, 2].map((r) => (
        <div key={r} className="board-row">
          {[0, 1, 2].map((box) => (
            <Square key={`${r * 3 + box + 1}`} turn={turn} setTurn={setTurn} />
          ))}
        </div>
      ))}
    </>
  )
}
