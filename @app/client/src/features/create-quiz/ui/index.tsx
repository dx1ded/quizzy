import { useNavigate } from "react-router-dom"
import { QuizType } from "@quizzy/common"
import { ComponentPropsWithoutRef } from "react"
import { Button } from "shared/ui/Button"
import { useSecuredRequest } from "entities/account"

export function CreateQuiz({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"button">) {
  const request = useSecuredRequest()
  const navigate = useNavigate()
  const buttonClassName = `px-5 ${className || ""}`

  const clickHandler = async () => {
    const { id } = await request<QuizType>("/api/quiz/create")

    navigate(`/quiz/edit/${id}`)
  }

  return (
    <Button
      className={buttonClassName}
      variant="secondary"
      onClick={clickHandler}
      {...props}>
      {children}
    </Button>
  )
}
