import { useDispatch } from "react-redux"
import { ThunkDispatch } from "redux-thunk"
import { NavLink, useNavigate } from "react-router-dom"
import { AppActions, AppStore } from "entities"
import { createNewQuiz } from "entities/quiz"
import { QuizzyImage } from "shared/ui/QuizzyImage"
import { Button } from "shared/ui/Button"

interface QuizBoxProps {
  id: string
  name: string
  description: string
  picture: string
}

export function QuizBox({ id, name, description, picture }: QuizBoxProps) {
  return (
    <div className="rounded-lg shadow-md">
      {picture ? (
        <img alt="Quiz" src={picture} />
      ) : (
        <QuizzyImage className="rounded-t-lg" height="4.5rem" width="100%" />
      )}
      <div className="px-3.5 pb-4 pt-2">
        <p className="mb-1.5">{name}</p>
        <span className="mb-4 line-clamp-2 text-[0.75rem]">{description}</span>
        <Button
          as={NavLink}
          className="w-full text-center"
          size="sm"
          to={`/play/${id}`}
          variant="white">
          Practice
        </Button>
      </div>
    </div>
  )
}

export function AddQuizBox() {
  const navigate = useNavigate()
  const dispatch = useDispatch<ThunkDispatch<AppStore, unknown, AppActions>>()

  const clickHandler = async () => {
    const { id } = await dispatch(createNewQuiz())

    navigate(`/quiz/edit/${id}`)
  }

  return (
    <div className="flex flex-col rounded-lg shadow-md">
      <QuizzyImage className="rounded-t-lg" height="4.5rem" width="100%" />
      <div className="flex flex-1 flex-col items-center justify-center px-3.5 pb-4 pt-2">
        <Button
          aria-label="Create a new quiz"
          className="mb-3 h-12 w-12"
          variant="secondary"
          onClick={clickHandler}>
          +
        </Button>
        <p className="text-sm">Create a new quiz</p>
      </div>
    </div>
  )
}
