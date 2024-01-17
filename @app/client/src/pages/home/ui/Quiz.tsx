import { Caption } from "shared/ui/Typography"
import { QuizzyImage } from "shared/ui/QuizzyImage"

interface QuizProps {
  name: string
  plays: number
}

export function Quiz({ name, plays }: QuizProps) {
  return (
    <div className="flex cursor-pointer items-center rounded-lg duration-200 hover:bg-[#f6f6f6]">
      <QuizzyImage className="rounded-l-lg" />
      <div>
        <Caption className="mb-2 block leading-[0.5rem]">{name}</Caption>
        <span className="rounded-3xl bg-secondary px-2 py-0.5 text-[0.65rem] font-bold text-white">
          {plays} plays
        </span>
      </div>
    </div>
  )
}
