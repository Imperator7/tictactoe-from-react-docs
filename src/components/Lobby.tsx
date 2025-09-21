import { useEffect } from 'react'

export default function Lobby() {
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000/')

    ws.addEventListener('message', () => {
      console.log('hey')
    })

    return () => {
      ws.close()
    }
  }, [])

  return <div>Lobby</div>
}
