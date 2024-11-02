import { NavLink } from "react-router-dom"
import { CreateQuiz } from "features/create-quiz"
import { Button } from "shared/ui/Button"

interface QuizBoxProps {
  id: string
  name: string
  cover: string
  description: string
}

export function QuizBox({ id, name, description, cover }: QuizBoxProps) {
  return (
    <div className="flex flex-col items-start rounded-lg shadow-md">
      <img
        alt="Quiz"
        className="mb-3 h-[4.5rem] w-full rounded-t-md object-cover"
        src={cover}
      />
      <div className="flex w-full flex-1 flex-col px-3.5 pb-4 pt-2">
        <p className="mb-1.5">{name}</p>
        <span className="mb-4 line-clamp-2 text-[0.75rem]">{description}</span>
        <Button
          as={NavLink}
          className="mt-auto w-full text-center"
          size="sm"
          to={`/quiz/${id}`}
          variant="white">
          Practice
        </Button>
      </div>
    </div>
  )
}

export function AddQuizBox() {
  return (
    <div className="flex flex-col rounded-lg shadow-md">
      <img
        alt="Quiz"
        className="h-[4.5rem] w-full rounded-t-lg object-cover"
        src="https://firebasestorage.googleapis.com/v0/b/quizzy-222b7.appspot.com/o/quiz_cover_default.png?alt=media"
      />
      <div className="flex flex-1 flex-col items-center justify-center px-3.5 pb-4 pt-2">
        <CreateQuiz className="mb-3 h-12 w-12">+</CreateQuiz>
        <p className="text-sm">Create a new quiz</p>
      </div>
    </div>
  )
}
