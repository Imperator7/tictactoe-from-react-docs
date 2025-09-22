import Game from './components/Game'
import './App.css'

function App() {
  return (
    <div className="min-h-screen relative">
      <div className="z-10 absolute top-50 left-50 w-1 h-1 bg-white rounded-full animate-[shoot_1.5s_linear_infinite]"></div>
      <div className="z-50 absolute top-170 left-110 w-1 h-1 bg-white rounded-full animate-[shoot_3=s_linear_infinite]"></div>
      <div className="z-50 absolute top-25 left-200 w-1 h-1 bg-white rounded-full animate-[shoot_1.5s_linear_infinite]"></div>
      <div className="z-50 absolute top-20 left-50 w-1 h-1 bg-white rounded-full animate-[shoot_1s_linear_infinite]"></div>
      <div className="z-50 absolute top-150 left-300 w-1 h-1 bg-white rounded-full animate-[shoot_1s_linear_infinite]"></div>
      <div className="z-50 absolute top-40 left-150 w-1 h-1 bg-white rounded-full animate-[shootInterval_4s_linear_infinite]"></div>
      <div className="z-50 absolute top-40 left-100 w-1 h-1 bg-white rounded-full animate-[shootInterval_4s_linear_infinite]"></div>
      <div className="z-50 absolute top-40 left-10 w-1 h-1 bg-white rounded-full animate-[shootInterval_4s_linear_infinite]"></div>
      <div className="z-50 absolute top-100 left-15 w-1 h-1 bg-white rounded-full animate-[shootInterval_3s_linear_infinite]"></div>
      <img src="/space.jpg" alt="" className="absolute min-h-screen" />
      <div className="py-32 relative min-h-screen flex flex-col items-center">
        <Game />
      </div>
    </div>
  )
}

export default App
