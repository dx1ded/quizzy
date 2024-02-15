import { IGameState } from "@quizzy/common"
import { NotFound } from "shared/ui/NotFound"
import { AnswerStage } from "./stages/AnswerStage"
import { ChooseAvatar } from "./stages/ChooseAvatar"
import { EndStage } from "./stages/EndStage"
import { GetReady } from "./stages/GetReady"
import { PlayersList } from "./stages/PlayersList"
import { QuestionResult } from "./stages/QuestionResult"
import { QuestionStage } from "./stages/QuestionStage"

const state: IGameState = {
  token: "1231241",
  creatorId: 12312312,
  quizId: "sadasd21e12das",
  quizName: "New Quiz",
  stage: "end",
  players: [
    {
      nickname: "vovados1",
      token: "askdadnjn21",
      points: 0,
      avatar: "monkey",
    },
  ],
  activeQuestion: 0,
  questions: [
    {
      name: "Do you believe in God",
      picture: "",
      background:
        "https://firebasestorage.googleapis.com/v0/b/quizzy-222b7.appspot.com/o/quiz-background.png?alt=media",
      answers: ["Yes", "No", "Not sure", "Miguel"],
      correctAnswers: [false, false, true, false],
      timeLimit: 30,
      points: 10,
    },
  ],
  answers: [
    {
      playerToken: "123asdas",
      answerIndex: 0,
    },
  ],
  progressBar: 10,
}

export function Play() {
  switch (state.stage) {
    case "settings":
      return <ChooseAvatar avatar="monkey" nickname="dx1ded" token="asdas" />
    case "menu":
      return <PlayersList pin={state.token} players={state.players} />
    case "start":
      return <GetReady progressBar={state.progressBar} />
    case "question":
      return (
        <QuestionStage
          progressBar={20}
          question={state.questions[state.activeQuestion]}
        />
      )
    case "answer":
      return <AnswerStage question={state.questions[state.activeQuestion]} />
    case "result":
      return (
        <QuestionResult
          answers={state.answers}
          players={state.players.length}
          question={state.questions[state.activeQuestion]}
        />
      )
    case "end":
      return <EndStage />
    default:
      return <NotFound />
  }
}
