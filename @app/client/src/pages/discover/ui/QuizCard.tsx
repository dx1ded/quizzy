import { NavLink } from "react-router-dom"
import { Button } from "shared/ui/Button"

interface QuizCardProps {
  id: string
  cover: string
}

export function QuizCard({ id, cover }: QuizCardProps) {
  return (
    <div className="group h-[9.75rem] sm:h-[7rem]">
      <img
        alt="Quiz"
        className="h-full w-full rounded-lg object-cover"
        src={cover}
      />
      <div className="absolute bottom-4 left-1/2 flex w-full -translate-x-1/2 translate-y-20 justify-center opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
        <Button
          as={NavLink}
          className="mx-5 w-full max-w-[15rem] text-center"
          size="md"
          to={`/quiz/${id}`}
          variant="secondary">
          Practice
        </Button>
      </div>
    </div>
  )
}
