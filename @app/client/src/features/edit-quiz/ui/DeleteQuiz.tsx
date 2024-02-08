import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Dialog } from "@mui/material"
import { useSecuredRequest } from "entities/account"
import { QuizState } from "entities/quiz"
import { Button } from "shared/ui/Button"
import { Caption, Text } from "shared/ui/Typography"
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
      {/* Delete dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <div className="max-w-md p-4">
          <Text className="mb-3 !font-semibold">
            Do you want to delete the quiz?
          </Text>
          <Caption className="mb-5 inline-block leading-5">
            Deleting the quiz you will not be able to restore it anymore. Are
            you sure you want to delete the quiz?
          </Caption>
          <div className="flex items-center gap-2.5 border-t border-gray pt-3">
            <Button
              className="px-5"
              size="md"
              variant="white"
              onClick={() => setDialogOpen(false)}>
              Close
            </Button>
            <Button
              className="px-5"
              size="md"
              variant="secondary"
              onClick={deleteHandler}>
              Delete
            </Button>
          </div>
        </div>
      </Dialog>
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
