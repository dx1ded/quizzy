import { useSelector } from "react-redux"
import { useFormContext } from "react-hook-form"
import { DraftQuizType } from "@quizzy/common"
import { QuizState } from "entities/quiz"
import { Input } from "shared/ui/Input"
import type { AppStore } from "app/model"
import { EditValidation } from "./EditValidation"

export function EditName() {
  const isPublished = useSelector<AppStore, QuizState["isPublished"]>(
    (state) => state.quiz.isPublished
  )
  const {
    register,
    formState: { errors },
  } = useFormContext<DraftQuizType>()

  return (
    <div className="mr-2.5">
      <Input
        className="w-60"
        disabled={isPublished}
        placeholder="Enter quiz name"
        {...register("name")}
      />
      <EditValidation error={errors.name} />
    </div>
  )
}
