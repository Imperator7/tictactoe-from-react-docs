import { useState, useMemo } from 'react'
import Board from './Board'

import useTicTacToe from '../../hooks/useTicTacToe'
import { currentBoard, currentTurn, getGameStatus } from '../game-core/engine'

export default function Game() {
  const [gameState, dispatch] = useTicTacToe()
  const [toggleShowHistory, setToggleShowHistory] = useState(false)

  const gameStage = useMemo(() => {
    return getGameStatus(gameState.history, gameState.currentMove)
  }, [gameState])

  const announcement = useMemo(() => {
    if (gameState.currentMove === 0) {
      return `🕹️ Let's game, the first player is X.`
    }
    if (gameStage.status === 'end') {
      return `The winner is player ${gameStage.winner}.`
    }
    if (gameStage.status === 'tie') {
      return `The game is tied, let's play again.`
    }
    if (gameStage.status === 'ongoing') {
      return `Current Turn: player ${currentTurn(gameState)}.`
    }
  }, [gameStage, gameState])

  const handlePlaceMark = (markAt: number) => {
    dispatch({
      type: 'mark',
      payload: {
        markAt,
      },
    })
  }

  const handleHistorySelect = (jumpTo: number) => {
    dispatch({
      type: 'jump',
      payload: {
        jumpTo,
      },
    })
  }

  const handlePlayAgain = () => {
    dispatch({
      type: 'reset',
    })
  }

  const isEnd = gameStage.status !== 'ongoing'
  return (
    <div className="w-full max-w-100 px-2">
      <h2 className="text-xl my-1.5 font-semibold">{announcement}</h2>
      <div>
        <Board
          marks={currentBoard(gameState)}
          handlePlaceMark={handlePlaceMark}
          gameStage={gameStage}
        />

        <div className="flex items-start justify-between ">
          <div>
            <button
              onClick={handlePlayAgain}
              className="px-9 py-2 my-1 bg-green-700 text-white font-bold rounded-lg"
            >
              {isEnd ? 'Restart' : 'Play again'}
            </button>
          </div>
          <div className="flex flex-col items-end">
            <button
              className="px-5 py-2 my-1 bg-amber-400 rounded-lg text-white font-bold"
              onClick={() => {
                setToggleShowHistory(!toggleShowHistory)
              }}
            >
              {toggleShowHistory ? 'Close history' : 'Show history'}
            </button>
            {toggleShowHistory && (
              <ul className="flex flex-col  items-end gap-2 my-3">
                {gameState.history.map((_round, index) => (
                  <li key={index}>
                    {
                      <button
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={() => handleHistorySelect(index)}
                      >
                        {index !== 0
                          ? `Go to move ${index}`
                          : `Go to game start`}
                      </button>
                    }
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
