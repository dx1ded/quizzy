import { useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useFormContext } from "react-hook-form"
import { DraftQuizType } from "@quizzy/common"
import { useSecuredRequest } from "entities/account"
import { QuizState, setIsPublished } from "entities/quiz"
import { Button } from "shared/ui/Button"
import type { AppStore } from "app/model"
import { EditContext } from "../model"

export function PublishQuiz() {
  const request = useSecuredRequest()
  const dispatch = useDispatch()
  const { submitHandler } = useContext(EditContext)
  const { isPublished } = useSelector<AppStore, QuizState>(
    (state) => state.quiz
  )
  const { watch, trigger } = useFormContext<DraftQuizType>()

  const id = watch("id")

  const clickHandler = async () => {
    await dispatch(setIsPublished(!isPublished))

    const isCorrect = await trigger()

    if (!isCorrect) {
      submitHandler()
      return setTimeout(() => dispatch(setIsPublished(isPublished)), 0)
    }

    await request(`/api/quiz/${isPublished ? "un" : ""}publish`, {
      method: "PUT",
      body: { id },
    })
  }

  return (
    <Button className="px-6" variant="secondary" onClick={clickHandler}>
      {isPublished ? "Unpublish" : "Publish"}
    </Button>
  )
}
