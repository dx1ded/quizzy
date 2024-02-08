import { useContext, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useFormContext } from "react-hook-form"
import { DraftQuizType } from "@quizzy/common"
import { ConfirmModal } from "shared/ui/ConfirmModal"
import { useSecuredRequest } from "entities/account"
import { QuizState, setIsPublished } from "entities/quiz"
import { capitalize } from "shared/lib"
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
  const [isOpen, setIsOpen] = useState(false)

  const id = watch("id")

  const clickHandler = async () => {
    await dispatch(setIsPublished(!isPublished))
    setIsOpen(false)

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
    <>
      <ConfirmModal
        buttonText={capitalize(`${isPublished ? "un" : ""}publish`)}
        description="Your quiz will become visible / unvisible for other users. You can always change your action back"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={`Do you want to ${isPublished ? "un" : ""}publish the quiz?`}
        onConfirm={clickHandler}
      />
      <Button
        className="px-6"
        variant="secondary"
        onClick={() => setIsOpen(true)}>
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
    </>
  )
}
