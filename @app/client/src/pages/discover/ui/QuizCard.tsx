import { NavLink } from "react-router-dom"
import { QuizzyImage } from "shared/ui/QuizzyImage"
import { Button } from "shared/ui/Button"

interface QuizCardProps {
  id: string
  cover: string
}

export function QuizCard({ id, cover }: QuizCardProps) {
  return (
    <div className="group h-[9.75rem]">
      {cover ? (
        <img alt="Quiz" src={cover} />
      ) : (
        <QuizzyImage
          className="rounded-lg"
          height="100%"
          size={1.5}
          width="100%"
        />
      )}
      <Button
        as={NavLink}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-20 px-20 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
        size="md"
        to={`/quiz/${id}`}
        variant="secondary">
        Practice
      </Button>
    </div>
  )
}
