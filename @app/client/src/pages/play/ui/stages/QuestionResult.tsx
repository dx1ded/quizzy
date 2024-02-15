import { AnswerType, QuestionType } from "@quizzy/common"
import { Subheading } from "shared/ui/Typography"
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

interface QuestionResultProps {
  question: QuestionType
  answers: AnswerType[]
  players: number
}

export function QuestionResult({
  answers,
  question,
  players,
}: QuestionResultProps) {
  return (
    <div className="absolute h-full w-full">
      <img
        alt="Quiz"
        className="absolute left-0 top-0 -z-20 h-full w-full object-cover"
        src={question.background}
      />
      <div className="absolute left-0 top-0 -z-10 h-full w-full bg-black opacity-50" />
      <div className="flex h-full w-full flex-col justify-between px-6 py-8">
        <div className="relative flex items-center justify-center">
          <div className="rounded-lg bg-white px-14 py-4 shadow-lg">
            <Subheading>{question.name} ?</Subheading>
          </div>
        </div>
        <div className="flex items-end justify-center gap-7">
          <TriangleAnswerColumn
            answers={
              answers.filter((answer) => answer.answerIndex === 0).length
            }
            isCorrect={question.correctAnswers[0]}
            players={players}
          />
          <RhombusAnswerColumn
            answers={
              answers.filter((answer) => answer.answerIndex === 1).length
            }
            isCorrect={question.correctAnswers[1]}
            players={players}
          />
          <CircleAnswerColumn
            answers={
              answers.filter((answer) => answer.answerIndex === 2).length
            }
            isCorrect={question.correctAnswers[2]}
            players={players}
          />
          <SquareAnswerColumn
            answers={
              answers.filter((answer) => answer.answerIndex === 3).length
            }
            isCorrect={question.correctAnswers[3]}
            players={players}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
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
