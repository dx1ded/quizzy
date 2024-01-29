import { useDispatch, useSelector } from "react-redux"
import { useFormContext } from "react-hook-form"
import { QuizType } from "@quizzy/common"
import QuizBackground from "assets/quiz-background.png"
import { addQuestion, QuizState } from "entities/quiz"
import { Button } from "shared/ui/Button"
import type { AppStore } from "app/model"
import { PreviewQuestion } from "./PreviewQuestion"

export function Preview() {
  const dispatch = useDispatch()
  const { activeQuestion } = useSelector<AppStore, QuizState>(
    (state) => state.quiz
  )
  const { watch } = useFormContext<QuizType>()
  const quiz = watch()

  return (
    <aside className="flex basis-56 flex-col gap-4 overflow-y-auto px-2 py-1.5">
      {quiz.questions.map((question, i) => (
        <PreviewQuestion
          key={i}
          answers={question.answers}
          background={question.background || QuizBackground}
          checked={question.correctAnswers}
          isActive={i === activeQuestion}
          n={i}
          name={question.name}
          picture={question.picture}
        />
      ))}
      <Button size="md" variant="white" onClick={() => dispatch(addQuestion())}>
        Add question
      </Button>
    </aside>
  )
}
