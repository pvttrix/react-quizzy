import { FC } from 'react'

const Progress: FC<{
  index: number
  points: number
  maxPoints: number
  numQuestions: number
  answer: null | number
}> = ({ index, points, maxPoints, numQuestions, answer }) => {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + Number(answer !== null)}
      />
      <p>
        Question <strong>{index + 1}</strong>
      </p>
      <p>
        Points{' '}
        <strong>
          {points} / {maxPoints}
        </strong>
      </p>
    </header>
  )
}

export default Progress
