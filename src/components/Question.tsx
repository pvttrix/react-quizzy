import { FC } from 'react'
import { IQuestion } from '../types/Question'
import { Actions } from '../types/Reducer'
import Options from './Options'

const Question: FC<{
  question: IQuestion
  dispatch: (action: Actions) => void
  answer: number | null
}> = ({ question, dispatch, answer }) => {
  return (
    <div>
      <h4>{question.question} </h4>
      <Options
        question={question}
        dispatch={dispatch}
        answer={answer}
      />
    </div>
  )
}

export default Question
