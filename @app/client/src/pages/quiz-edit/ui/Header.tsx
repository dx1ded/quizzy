import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { useFormContext } from "react-hook-form"
import { QuizType } from "@quizzy/common"
import { QuizState } from "entities/quiz"
import { Logo } from "shared/ui/Logo"
import { Input } from "shared/ui/Input"
import { Button } from "shared/ui/Button"
import type { AppStore } from "app/model"

export function Header() {
  const { activeQuestion } = useSelector<AppStore, QuizState>(
    (state) => state.quiz
  )
  const { register, watch } = useFormContext<QuizType>()
  const question = watch("questions")[activeQuestion]

  return (
    <header className="flex items-center bg-white px-6 py-2 shadow">
      <Logo as={NavLink} className="mr-6" size={2.75} to="/app" />
      <Input
        className="w-60"
        defaultValue={question.name}
        placeholder="Enter quiz name..."
        {...register("name")}
      />
      <Button className="ml-auto mr-4 px-8" variant="white">
        Delete
      </Button>
      <Button className="px-8" variant="secondary">
        Settings
      </Button>
    </header>
  )
}
