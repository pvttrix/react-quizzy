import { FC } from 'react'
import { IQuestion } from '../types/Question'
import { ActionTypes, Actions } from '../types/Reducer'

const Options: FC<{
  question: IQuestion
  dispatch: (action: Actions) => void
  answer: number | null
}> = ({ question, dispatch, answer }) => {
  const hasAnswered: boolean = answer !== null
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer} ? "answer" : "" ${
            hasAnswered
              ? index === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() =>
            dispatch({
              type: ActionTypes.answer,
              payload: index,
            })
          }
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export default Options
