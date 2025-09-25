import Game from './components/Game'
import './App.css'

function App() {
  return (
    <div className="max-h-dvh relative overflow-hidden inset-0 bg-[url('/space.jpg')] bg-center bg-cover bg-no-">
      <div className="absolute z-10 top-[50%] left-[50%] w-1 h-1 bg-white rounded-full animate-[shoot_1.5s_linear_infinite]" />
      <div className="absolute z-10 top-[35%] left-[70%] w-1 h-1 bg-white rounded-full animate-[shoot_3s_linear_infinite]" />
      <div className="absolute z-10 top-[25%] left-[20%] w-1 h-1 bg-white rounded-full animate-[shoot_1.5s_linear_infinite]" />
      <div className="absolute z-10 top-[20%] left-[50%] w-1 h-1 bg-white rounded-full animate-[shoot_1s_linear_infinite]" />
      <div className="absolute z-10 top-[65%] left-[90%] w-1 h-1 bg-white rounded-full animate-[shoot_1s_linear_infinite]" />
      <div className="absolute z-10 top-[40%] left-[50%] w-1 h-1 bg-white rounded-full animate-[shootInterval_4s_linear_infinite]" />
      <div className="absolute z-10 top-[40%] left-[33%] w-1 h-1 bg-white rounded-full animate-[shootInterval_4s_linear_infinite]" />
      <div className="absolute z-10 top-[40%] left-[5%]  w-1 h-1 bg-white rounded-full animate-[shootInterval_4s_linear_infinite]" />
      <div className="absolute z-10 top-[70%] left-[8%]  w-1 h-1 bg-white rounded-full animate-[shootInterval_3s_linear_infinite]" />
      <div className="py-32 relative min-h-screen flex flex-col items-center ">
        <Game />
      </div>
    </div>
  )
}

export default App
