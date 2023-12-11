import { FC } from 'react'

const StartScreen: FC<{ numQuestions: number; onStart: () => void }> = ({
  numQuestions,
  onStart,
}) => {
  return (
    <div className="start">
      <h2>Welcome to The Quiz</h2>
      <h3> {numQuestions} question to test your React Mastery</h3>
      <button
        className="btn btn-ui"
        onClick={onStart}
      >
        Lets go
      </button>
    </div>
  )
}

export default StartScreen
