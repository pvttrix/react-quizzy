import { IQuestion } from './Question'

export enum ActionTypes {
  fetchedQuestions = 'fetchedQuestions',
  error = 'error',
  active = 'active',
  answer = 'answer',
  nextQuestion = 'nextQuestion',
  finished = 'finished',
  restarted = 'restarted',
  tick = 'tick',
}

export enum Statuses {
  loading = 'loading',
  success = 'success',
  error = 'error',
  active = 'active',
  finished = 'finished',
  restarted = 'restarted',
}

export interface IState {
  questions: IQuestion[]
  status: Statuses
  index: number
  answer: null | number
  points: number
  secondsRemaining: number | null
}
export type Actions =
  | { type: ActionTypes.fetchedQuestions; payload: IQuestion[] }
  | { type: ActionTypes.error }
  | { type: ActionTypes.active }
  | { type: ActionTypes.answer; payload: number }
  | { type: ActionTypes.nextQuestion }
  | { type: ActionTypes.finished }
  | { type: ActionTypes.restarted }
  | { type: ActionTypes.tick }
