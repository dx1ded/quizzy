import { useSelector } from "react-redux"
import { useFormContext, useWatch } from "react-hook-form"
import { DraftQuizType } from "@quizzy/common"
import { AddQuestion } from "features/edit-quiz"
import { QuizState } from "entities/quiz"
import { Button } from "shared/ui/Button"
import type { AppStore } from "app/model"
import { PreviewQuestion } from "./PreviewQuestion"

export function Preview() {
  const { activeQuestion, isPublished } = useSelector<AppStore, QuizState>(
    (state) => state.quiz
  )

  const { control } = useFormContext<DraftQuizType>()
  const questions = useWatch({ control, name: "questions" })

  return (
    <aside className="flex basis-56 flex-col gap-4 overflow-y-auto px-2 py-1.5">
      {questions.map((question, i) => (
        <PreviewQuestion
          key={i}
          answers={question.answers}
          background={question.background}
          checked={question.correctAnswers}
          isActive={i === activeQuestion}
          isPublished={isPublished}
          n={i}
          name={question.name}
          picture={question.picture}
        />
      ))}
      <AddQuestion
        render={() => (
          <Button disabled={isPublished} size="md" variant="white">
            Add question
          </Button>
        )}
      />
    </aside>
  )
}
