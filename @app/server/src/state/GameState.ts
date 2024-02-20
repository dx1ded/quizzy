import {
  AnswerType,
  ChangeAvatarType,
  IGameState,
  JoinType,
  RecordType,
} from "@quizzy/common"
import { generateNumberedId } from "../utils"

export class GameState {
  public state: IGameState
  public record: RecordType | undefined

  static sessions: GameState[] = []
  static broadcast: (message: string) => void

  // in ms
  readonly START_MESSAGE_TIME = 5000
  readonly QUESTION_ASKED_TIME = 5000
  readonly QUESTION_RESULT_TIME = 5000

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
      GameState.broadcast(JSON.stringify({ state: this.state }))
    }, this.START_MESSAGE_TIME / 100)
  }

  join(player: JoinType) {
    const playerToken = generateNumberedId()

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

    GameState.broadcast(JSON.stringify({ state: this.state }))

    const interval = setInterval(() => {
      if (this.state.progressBar === 100) {
        clearInterval(interval)
        return this.setAnswerStage()
      }

      this.state.progressBar++
      GameState.broadcast(JSON.stringify({ state: this.state }))
    }, this.QUESTION_ASKED_TIME / 100)
  }

  setAnswerStage() {
    this.state.stage = "answer"
    this.state.progressBar = 0

    GameState.broadcast(JSON.stringify({ state: this.state }))

    const question = this.state.questions[this.state.activeQuestion]

    const interval = setInterval(
      () => {
        if (
          this.state.progressBar === 100 ||
          this.state.answers.length === this.state.players.length
        ) {
          clearInterval(interval)
          return this.setResultStage()
        }

        this.state.progressBar++
        GameState.broadcast(JSON.stringify({ state: this.state }))
      },
      (question.timeLimit * 1000) / 100
    )
  }

  setResultStage() {
    this.state.stage = "result"
    this.state.progressBar = 0

    GameState.broadcast(JSON.stringify({ state: this.state }))

    const interval = setInterval(() => {
      if (this.state.progressBar === 100) {
        clearInterval(interval)
        return this.setNextQuestion()
      }

      this.state.progressBar++
      GameState.broadcast(JSON.stringify({ state: this.state }))
    }, this.QUESTION_RESULT_TIME / 100)
  }

  async finish() {
    this.state.stage = "end"

    GameState.broadcast(JSON.stringify({ state: this.state }))

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
