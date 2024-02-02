import { useFormContext } from "react-hook-form"
import { QuizType } from "@quizzy/common"
import { Input } from "shared/ui/Input"
import { EditValidation } from "./EditValidation"

export function EditName() {
  const {
    register,
    formState: { errors },
  } = useFormContext<QuizType>()

  return (
    <div>
      <Input
        className="w-60"
        placeholder="Enter quiz name"
        {...register("name")}
      />
      <EditValidation error={errors.name} />
    </div>
  )
}
