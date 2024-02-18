import { customAlphabet } from "nanoid"
import {
  AnswerType,
  ChangeAvatarType,
  IGameState,
  JoinType,
  RecordType,
} from "@quizzy/common"

export class GameState {
  public state: IGameState
  public record: RecordType | undefined

  static sessions: GameState[] = []

  readonly START_MESSAGE_TIME = 5
  readonly QUESTION_ASKED_TIME = 10
  readonly QUESTION_RESULT_TIME = 10

  constructor(defaultState: IGameState) {
    this.state = defaultState
    GameState.sessions.push(this)
  }

  menu() {
    this.state.stage = "menu"
  }

  start() {
    this.state.stage = "start"
    const interval = setInterval(() => {
      if (this.state.progressBar === 100) {
        clearInterval(interval)
        return this.setNextQuestion()
      }
      this.state.progressBar++
    }, this.START_MESSAGE_TIME / 60)
  }

  join(player: JoinType) {
    const nanoid = customAlphabet("123456789", 7)
    const playerToken = nanoid()

    this.state.players.push({
      ...player,
      token: playerToken,
      points: 0,
    })

    return playerToken
  }

  leave(playerToken: string) {
    this.state.players = this.state.players.filter(
      (player) => player.token !== playerToken
    )

    if (!this.state.players) {
      GameState.sessions = GameState.sessions.filter(
        (session) => session !== this
      )
    }
  }

  changeAvatar(data: ChangeAvatarType) {
    this.state.players = this.state.players.map((player) =>
      player.token === data.playerToken
        ? { ...player, avatar: data.avatar }
        : player
    )
  }

  answer(answer: AnswerType) {
    const question = this.state.questions[this.state.activeQuestion]

    this.state.answers.push(answer)

    if (question.correctAnswers[answer.answerIndex]) {
      this.state.players = this.state.players.map((player) =>
        player.token === answer.playerToken
          ? {
              ...player,
              points: player.points + question.points,
            }
          : player
      )
    }
  }

  setNextQuestion() {
    this.state.activeQuestion++

    if (this.state.activeQuestion === this.state.questions.length) {
      return this.finish()
    }

    this.state.stage = "question"
    this.state.answers = []
    this.state.progressBar = 0

    const interval = setInterval(() => {
      if (this.state.progressBar === 100) {
        clearInterval(interval)
        return this.setAnswerStage()
      }

      this.state.progressBar++
    }, this.QUESTION_ASKED_TIME / 60)
  }

  setAnswerStage() {
    this.state.stage = "answer"
    this.state.progressBar = 0

    const question = this.state.questions[this.state.activeQuestion]

    const interval = setInterval(() => {
      if (this.state.progressBar === 100) {
        clearInterval(interval)
        return this.setResultStage()
      }

      this.state.progressBar++
    }, question.timeLimit / 60)
  }

  setResultStage() {
    this.state.stage = "result"
    this.state.progressBar = 0

    const interval = setInterval(() => {
      if (this.state.progressBar === 100) {
        clearInterval(interval)
        return this.setNextQuestion()
      }

      this.state.progressBar++
    }, this.QUESTION_RESULT_TIME / 60)
  }

  async finish() {
    this.state.stage = "end"

    const record = {
      quizId: this.state.quizId,
      quizName: this.state.quizName,
      userRef: this.state.creatorId,
      date: Date.now(),
      result: this.state.players,
    }

    this.record = await fetch("http://localhost:5000/api/record/create", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ record }),
    }).then((res) => res.json() as Promise<RecordType>)
  }
}
