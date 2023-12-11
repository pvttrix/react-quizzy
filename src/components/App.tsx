import { useEffect, useReducer } from 'react'
import { IQuestion } from '../types/Question'
import { ActionTypes, Actions, IState, Statuses } from '../types/Reducer'
import ErrorDisplay from './ErrorDisplay'
import FinishScreen from './FinishScreen'
import Loader from './Loader'
import NextButton from './NextButton'
import Progress from './Progress'
import Question from './Question'
import StartScreen from './StartScreen'
import Timer from './Timer'
import Footer from './layout/Footer'
import Header from './layout/Header'
import Main from './layout/Main'

const SECS_PER_QUESTION = 30

function reducer(state: IState, action: Actions): IState {
  switch (action.type) {
    case ActionTypes.fetchedQuestions:
      return { ...state, questions: action.payload, status: Statuses.success }
    case ActionTypes.error:
      return { ...state, status: Statuses.error }
    case ActionTypes.active:
      return {
        ...state,
        status: Statuses.active,
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      }
    case ActionTypes.answer:
      const question = state.questions[state.index]
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      }
    case ActionTypes.nextQuestion:
      return { ...state, index: state.index + 1, answer: null }
    case ActionTypes.finished:
      return { ...state, status: Statuses.finished }
    case ActionTypes.restarted:
      return {
        ...initialState,
        questions: state.questions,
        status: Statuses.success,
      }
    case ActionTypes.tick:
      return {
        ...state,
        secondsRemaining:
          state.secondsRemaining !== null
            ? state.secondsRemaining - 1
            : state.secondsRemaining,
        status: state.secondsRemaining === 0 ? Statuses.finished : state.status,
      }
    default:
      return {
        ...initialState,
      }
  }
}

const initialState: IState = {
  questions: [] as IQuestion[],
  status: Statuses.loading,
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: null,
}

function App() {
  const [
    { questions, status, index, answer, points, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState)
  const numQuestions = questions.length
  const maxPoints = questions.reduce((prev, next) => prev + next.points, 0)
  const isLastQuestion = index === numQuestions - 1
  function handleStart() {
    dispatch({ type: ActionTypes.active })
  }
  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error from server`)
        }
        return response.json()
      })
      .then((data) =>
        dispatch({
          type: ActionTypes.fetchedQuestions,
          payload: data as IQuestion[],
        })
      )
      .catch(() => dispatch({ type: ActionTypes.error }))
  }, [])

  return (
    <div className="app">
      <Header />
      <Main>
        {status === Statuses.loading && <Loader />}
        {status === Statuses.error && <ErrorDisplay />}
        {status === Statuses.finished && (
          <FinishScreen
            maxPossiblePoints={maxPoints}
            points={points}
            dispatch={dispatch}
          />
        )}
        {status === Statuses.success && (
          <StartScreen
            numQuestions={numQuestions}
            onStart={handleStart}
          />
        )}
        {status === Statuses.active && (
          <>
            <Progress
              index={index}
              points={points}
              maxPoints={maxPoints}
              numQuestions={numQuestions}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer
                dispatch={dispatch}
                secondsRemaining={secondsRemaining}
              />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                isLastQuestion={isLastQuestion}
              />
            </Footer>
          </>
        )}
      </Main>
    </div>
  )
}

export default App
