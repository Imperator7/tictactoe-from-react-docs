import type { Player } from '../App'
import Square from './Square'
import { type Dispatch, type SetStateAction } from 'react'

type BoardProps = {
  turn: Player
  setTurn: Dispatch<SetStateAction<Player>>
}

export default function Board({ turn, setTurn }: BoardProps) {
  console.log(turn)

  return (
    <>
      {[0, 1, 2].map((r) => (
        <div key={r} className="board-row">
          {[0, 1, 2].map((box) => (
            <Square key={`${r} - ${box}`} turn={turn} setTurn={setTurn} />
          ))}
        </div>
      ))}
    </>
  )
}
