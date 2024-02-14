import { QuestionType } from "../quiz"

export type JoinType = {
  id?: number
  nickname: string
}

export type PlayerType = JoinType & {
  token: string
  points: number
}

export type AnswerType = {
  playerToken: string
  answerIndex: number
}

export interface IGameState {
  token: string
  creatorId: number
  quizId: string
  quizName: string
  /**
   * Menu - Lobby (waiting menu)
   * Start - "Get ready" message at the start
   * Question - Question asked
   * Answer - Answers list (user has to answer in this stage)
   * Result - Question result
   * End - Podium / scoreboard
   */
  stage: "menu" | "start" | "question" | "answer" | "result" | "end"
  players: PlayerType[]
  activeQuestion: number
  questions: QuestionType[]
  answers: AnswerType[]
  progressBar: number
}

export type SessionToken = Pick<IGameState, "token">
