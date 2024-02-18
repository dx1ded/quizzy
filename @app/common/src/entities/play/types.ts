import { QuestionType } from "../quiz"

export type AvatarType =
  | "monkey"
  | "squirrel"
  | "racoon"
  | "hamster"
  | "fox"
  | "bunny"
  | "wolf"
  | "pig"
  | "elk"
  | "bear"
  | "cat"
  | "panda"
  | "zebra"
  | "donkey"
  | "elephant"
  | "rabbit"

export type JoinType = {
  id?: number
  nickname: string
  avatar: AvatarType
}

export type PlayerType = JoinType & {
  token: string
  points: number
}

export type AnswerType = {
  playerToken: string
  answerIndex: number
}

export type ChangeAvatarType = {
  playerToken: string
  avatar: AvatarType
}

export interface IGameState {
  sessionId: string
  creatorId: number
  quizId: string
  quizName: string
  /**
   * Settings - Creator chooses his avatar (in this stage players cannot join)
   * Menu - Lobby (waiting menu)
   * Start - "Get ready" message at the start
   * Question - Question asked
   * Answer - Answers list (user has to answer in this stage)
   * Result - Question result
   * EndStage - Podium / scoreboard
   */
  stage:
    | "settings"
    | "menu"
    | "start"
    | "question"
    | "answer"
    | "result"
    | "end"
  players: PlayerType[]
  activeQuestion: number
  questions: QuestionType[]
  answers: AnswerType[]
  progressBar: number
}

export type CreateGameResponse = {
  sessionId: IGameState["sessionId"]
  playerToken: PlayerType["token"]
}

export type PlayResponse = {
  state: IGameState
  playerToken: PlayerType["token"]
}
