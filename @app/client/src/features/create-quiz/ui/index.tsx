import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AppThunkDispatch } from "entities"
import { createNewQuiz } from "entities/quiz"
import { Button } from "shared/ui/Button"

export function CreateQuiz() {
  const dispatch = useDispatch<AppThunkDispatch>()
  const navigate = useNavigate()

  const clickHandler = async () => {
    const { id } = await dispatch(createNewQuiz())

    navigate(`/quiz/edit/${id}`)
  }

  return (
    <Button className="px-5" variant="secondary" onClick={clickHandler}>
      Create
    </Button>
  )
}
