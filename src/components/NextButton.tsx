import { FC } from 'react'
import { ActionTypes, Actions } from '../types/Reducer'

const NextButton: FC<{
  dispatch: (action: Actions) => void
  answer: number | null
  isLastQuestion: boolean
}> = ({ dispatch, answer, isLastQuestion }) => {
  if (answer === null) return null
  return (
    <>
      {!isLastQuestion && (
        <button
          className="btn btn-ui"
          onClick={() =>
            dispatch({
              type: ActionTypes.nextQuestion,
            })
          }
        >
          next
        </button>
      )}
      {isLastQuestion && (
        <button
          className="btn btn-ui"
          onClick={() =>
            dispatch({
              type: ActionTypes.finished,
            })
          }
        >
          Finish Test
        </button>
      )}
    </>
  )
}

export default NextButton
