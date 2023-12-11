import { FC } from 'react'
import { ActionTypes, Actions } from '../types/Reducer'

const FinishScreen: FC<{
  points: number
  maxPossiblePoints: number
  dispatch: (action: Actions) => void
}> = ({ points, maxPossiblePoints, dispatch }) => {
  const percentage = (points / maxPossiblePoints) * 100

  return (
    <>
      <p className="result">
        You Scored <strong>{points}</strong> out of {maxPossiblePoints}{' '}
        {Math.ceil(percentage)}%
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: ActionTypes.restarted })}
      >
        Lets go
      </button>
    </>
  )
}

export default FinishScreen
