import { useSelector } from "react-redux"
import { useFormContext } from "react-hook-form"
import { QuizType } from "@quizzy/common"
import QuizBackground from "assets/quiz-background.png"
import { QuizState } from "entities/quiz"
import { Input } from "shared/ui/Input"
import { Button } from "shared/ui/Button"
import { Text } from "shared/ui/Typography"
import {
  CircleAnswer,
  RhombusAnswer,
  SquareAnswer,
  TriangleAnswer,
} from "shared/ui/Answer"
import type { AppStore } from "app/model"

export function Question() {
  const { activeQuestion } = useSelector<AppStore, QuizState>(
    (state) => state.quiz
  )
  const { register, watch } = useFormContext<QuizType>()
  const question = watch("questions")[activeQuestion]

  return (
    <main className="relative flex-1">
      <img
        alt="Quiz"
        className="absolute left-0 top-0 -z-10 h-full w-full object-cover"
        src={question.background || QuizBackground}
      />
      <div className="flex h-full flex-col items-center justify-between px-5 py-10">
        <Input
          className="w-[28.75rem] py-2 text-xl shadow-lg"
          placeholder="Start typing your question..."
          value={question.name}
          isCentered
          {...register(`questions.${activeQuestion}.name`)}
        />
        <div className="relative flex h-80 w-96 flex-col items-center justify-center rounded bg-white shadow-lg">
          <img
            alt="Quiz question"
            className="absolute left-0 top-0 -z-10 h-full w-full rounded"
            src={question.picture}
          />
          <Button
            aria-label="Add picture"
            className="mb-5 h-16 w-16 text-xl"
            variant="secondary">
            +
          </Button>
          <Text className="font-bold">Find or insert media</Text>
        </div>
        <div className="grid w-full grid-cols-2 gap-4">
          <TriangleAnswer
            activeQuestion={activeQuestion}
            isChecked={question.correctAnswers[0]}
            value={question.answers[0]}
          />
          <RhombusAnswer
            activeQuestion={activeQuestion}
            isChecked={question.correctAnswers[1]}
            value={question.answers[1]}
          />
          <CircleAnswer
            activeQuestion={activeQuestion}
            isChecked={question.correctAnswers[2]}
            value={question.answers[2]}
          />
          <SquareAnswer
            activeQuestion={activeQuestion}
            isChecked={question.correctAnswers[3]}
            value={question.answers[3]}
          />
        </div>
      </div>
    </main>
  )
}
