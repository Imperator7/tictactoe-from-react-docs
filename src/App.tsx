import Game from './components/Game'
import Lobby from './components/Lobby'
import './App.css'

function App() {
  return (
    <div className="p-16 min-h-screen flex flex-col items-center  bg-lime-50">
      <Game />
      <Lobby />
    </div>
  )
}

export default App
