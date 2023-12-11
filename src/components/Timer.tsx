import { FC, useEffect } from 'react'
import { ActionTypes, Actions } from '../types/Reducer'

const Timer: FC<{
  dispatch: (action: Actions) => void
  secondsRemaining: number | null
}> = ({ dispatch, secondsRemaining }) => {
  const mins = secondsRemaining !== null ? Math.floor(secondsRemaining / 60) : 0
  const seconds = secondsRemaining !== null ? secondsRemaining % 60 : 0
  useEffect(() => {
    const id = setInterval(() => dispatch({ type: ActionTypes.tick }), 1000)
    return () => clearInterval(id)
  }, [dispatch])
  return (
    <div className="timer">
      {mins < 10 && '0'}
      {mins}: {seconds < 10 && '0'}
      {seconds}
    </div>
  )
}

export default Timer
