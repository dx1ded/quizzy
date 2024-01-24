import { NavLink } from "react-router-dom"
import { Caption } from "shared/ui/Typography"
import { QuizzyImage } from "shared/ui/QuizzyImage"

interface QuizProps {
  id: string
  name: string
  picture: string
  plays: number
}

export function Quiz({ id, name, picture, plays }: QuizProps) {
  return (
    <NavLink
      className="flex cursor-pointer items-center rounded-lg duration-200 hover:bg-[#f6f6f6]"
      to={`/quiz/${id}`}>
      {picture ? (
        <img alt="Quiz" src={picture} />
      ) : (
        <QuizzyImage className="mr-2.5 rounded-l-lg" />
      )}
      <div>
        <Caption className="mb-2 block leading-[0.5rem]">{name}</Caption>
        <span className="rounded-3xl bg-secondary px-2 py-0.5 text-[0.65rem] font-bold text-white">
          {plays} plays
        </span>
      </div>
    </NavLink>
  )
}
