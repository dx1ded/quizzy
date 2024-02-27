import { useNavigate } from "react-router-dom"
import { CreateGameResponse } from "@quizzy/common"
import { useSecuredRequest } from "entities/account"
import { Button } from "shared/ui/Button"

interface StartQuizProps {
  quizId: string
}

export function StartQuiz({ quizId }: StartQuizProps) {
  const navigate = useNavigate()
  const request = useSecuredRequest()

  const clickHandler = async () => {
    const { sessionId, playerToken } = await request<CreateGameResponse>(
      "/api/play/create",
      {
        body: { id: quizId },
      }
    )

    localStorage.setItem("playerToken", playerToken)
    navigate(`/play?sessionId=${sessionId}`)
  }

  return (
    <Button className="px-8 lg:px-6" variant="secondary" onClick={clickHandler}>
      Start
    </Button>
  )
}
