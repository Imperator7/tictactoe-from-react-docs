import { useState } from 'react'

export default function Square() {
  type markType = '' | 'X' | 'O'

  const [mark, setMark] = useState<markType>('')

  const onSquareClick = () => {
    setMark('X')
  }

  return (
    <button className="square" onClick={onSquareClick}>
      {mark}
    </button>
  )
}
