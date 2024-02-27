import { useContext } from "react"
import { Subheading } from "shared/ui/Typography"
import { PlayContext } from "../../model"
import {
  CircleAnswer,
  RhombusAnswer,
  SquareAnswer,
  TriangleAnswer,
} from "../Answer"
import {
  CircleAnswerColumn,
  RhombusAnswerColumn,
  SquareAnswerColumn,
  TriangleAnswerColumn,
} from "../AnswerColumn"

export function QuestionResult() {
  const { state } = useContext(PlayContext)
  const question = state.questions[state.activeQuestion]

  return (
    <div className="absolute h-full w-full">
      <img
        alt="Quiz"
        className="fixed left-0 top-0 -z-20 h-full w-full object-cover"
        src={question.background}
      />
      <div className="absolute left-0 top-0 -z-10 h-full w-full bg-black opacity-50" />
      <div className="flex h-full w-full flex-col justify-between gap-12 px-6 py-8 lg:px-4 lg:py-6 md:px-3 md:py-4 sm:p-2 sm:pt-4">
        <div className="relative flex items-center justify-center">
          <div className="rounded-lg bg-white px-14 py-4 shadow-lg lg:px-8 lg:py-3 sm:px-4">
            <Subheading className="text-center">{question.name}</Subheading>
          </div>
        </div>
        <div className="flex items-end justify-center gap-7 lg:gap-5 md:gap-3.5">
          <TriangleAnswerColumn
            answers={
              state.answers.filter((answer) => answer.answerIndex === 0).length
            }
            isCorrect={question.correctAnswers[0]}
            players={state.players.length}
          />
          <RhombusAnswerColumn
            answers={
              state.answers.filter((answer) => answer.answerIndex === 1).length
            }
            isCorrect={question.correctAnswers[1]}
            players={state.players.length}
          />
          <CircleAnswerColumn
            answers={
              state.answers.filter((answer) => answer.answerIndex === 2).length
            }
            isCorrect={question.correctAnswers[2]}
            players={state.players.length}
          />
          <SquareAnswerColumn
            answers={
              state.answers.filter((answer) => answer.answerIndex === 3).length
            }
            isCorrect={question.correctAnswers[3]}
            players={state.players.length}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 md:gap-2 sm:grid-cols-1 sm:gap-1.5">
          <TriangleAnswer
            isCorrect={question.correctAnswers[0]}
            name={question.answers[0]}
          />
          <RhombusAnswer
            isCorrect={question.correctAnswers[1]}
            name={question.answers[1]}
          />
          <CircleAnswer
            isCorrect={question.correctAnswers[2]}
            name={question.answers[2]}
          />
          <SquareAnswer
            isCorrect={question.correctAnswers[3]}
            name={question.answers[3]}
          />
        </div>
      </div>
    </div>
  )
}
