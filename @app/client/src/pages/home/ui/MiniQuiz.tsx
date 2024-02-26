import { NavLink } from "react-router-dom"
import { Caption } from "shared/ui/Typography"

interface QuizProps {
  id: string
  name: string
  cover: string
  plays: number
}

export function MiniQuiz({ id, name, cover, plays }: QuizProps) {
  return (
    <NavLink
      className="flex cursor-pointer items-center gap-2.5 rounded-lg duration-200 hover:bg-[#f6f6f6]"
      to={`/quiz/${id}`}>
      <img
        alt="Quiz"
        className="h-[3.5rem] w-[6rem] rounded-l-lg object-cover lg:w-[5rem]"
        src={cover}
      />
      <div>
        <Caption className="mb-2 block leading-[1rem]">{name}</Caption>
        <span className="rounded-3xl bg-secondary px-2 py-0.5 text-[0.65rem] font-bold text-white">
          {plays} plays
        </span>
      </div>
    </NavLink>
  )
}
