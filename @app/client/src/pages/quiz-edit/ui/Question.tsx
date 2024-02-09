import { useSelector } from "react-redux"
import { useFormContext, useWatch } from "react-hook-form"
import { DraftQuizType } from "@quizzy/common"
import QuizBackground from "assets/quiz-background.png"
import {
  ChangeQuestionBackground,
  ChangeQuestionPicture,
  EditQuestionName,
  QuestionAnswer,
} from "features/edit-quiz"
import { QuizState } from "entities/quiz"
import { Text } from "shared/ui/Typography"
import type { AppStore } from "app/model"

export function Question() {
  const { activeQuestion } = useSelector<AppStore, QuizState>(
    (state) => state.quiz
  )
  const { control } = useFormContext<DraftQuizType>()
  const question = useWatch({ control, name: "questions" })[activeQuestion]

  return (
    <main className="relative flex-1">
      <img
        alt="Quiz"
        className="absolute left-0 top-0 -z-10 h-full w-full object-cover"
        src={question.background || QuizBackground}
      />
      <ChangeQuestionBackground />
      <div className="flex h-full flex-col items-center justify-between px-5 py-10">
        <EditQuestionName />
        <div className="relative flex h-80 w-96 flex-col items-center justify-center rounded bg-white shadow-lg">
          {question.picture && (
            <img
              alt="Quiz question"
              className="absolute left-0 top-0 z-0 h-full w-full rounded object-cover"
              src={question.picture}
            />
          )}
          <ChangeQuestionPicture />
          <Text className="font-bold">Find or insert media</Text>
        </div>
        <div className="grid w-full grid-cols-2 gap-4">
          <QuestionAnswer type="triangle" />
          <QuestionAnswer type="rhombus" />
          <QuestionAnswer type="circle" />
          <QuestionAnswer type="square" />
        </div>
      </div>
    </main>
  )
}
