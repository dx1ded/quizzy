import { useFormContext } from "react-hook-form"
import { QuizType } from "@quizzy/common"
import { useDispatch } from "react-redux"
import QuizBackground from "assets/quiz-background.png"
import { Button } from "shared/ui/Button"
import { addQuestion } from "entities/quiz"
import { PreviewQuestion } from "./PreviewQuestion"
import { QuizParams } from "./index"

export function Preview({ activeQuestion }: QuizParams) {
  const dispatch = useDispatch()
  const { watch } = useFormContext<QuizType>()
  const quiz = watch()

  return (
    <aside className="flex basis-56 flex-col gap-4 overflow-y-auto px-2 py-1.5">
      {quiz.questions.map((question, i) => (
        <PreviewQuestion
          key={i}
          answers={question.answers}
          bg={quiz.background || QuizBackground}
          checked={question.correctAnswers}
          image={question.picture}
          isActive={i === activeQuestion}
          n={i}
          name={question.name}
        />
      ))}
      <Button size="md" variant="white" onClick={() => dispatch(addQuestion())}>
        Add question
      </Button>
    </aside>
  )
}
