import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ConfirmModal } from "shared/ui/ConfirmModal"
import { useSecuredRequest } from "entities/account"
import { QuizState } from "entities/quiz"
import { Button } from "shared/ui/Button"
import type { AppStore } from "app/model"

export function DeleteQuiz() {
  const request = useSecuredRequest()
  const navigate = useNavigate()
  const { data, isPublished } = useSelector<AppStore, QuizState>(
    (state) => state.quiz
  )
  const [dialogOpen, setDialogOpen] = useState(false)

  const deleteHandler = async () => {
    await request("/api/quiz/delete", {
      method: "DELETE",
      body: { id: data.id },
    })
    navigate("/app")
  }

  return (
    <div>
      <ConfirmModal
        buttonText="Delete"
        description="Deleting the quiz you will not be able to restore it anymore. Are you
          sure you want to delete the quiz?"
        isOpen={dialogOpen}
        setIsOpen={setDialogOpen}
        title="Do you want to delete the quiz?"
        onConfirm={deleteHandler}
      />
      <Button
        className="px-6"
        disabled={isPublished}
        variant="white"
        onClick={() => setDialogOpen(true)}>
        Delete
      </Button>
    </div>
  )
}
