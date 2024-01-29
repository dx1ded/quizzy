import QuizBackground from "assets/quiz-background.png"
import { Caption } from "shared/ui/Typography"

interface QuestionProps {
  n: number
  name: string
  background: string
  time: number
}

export function Question({ n, name, background, time }: QuestionProps) {
  return (
    <div className="flex items-center justify-between rounded border border-gray">
      <div className="p-2">
        <p className="font-bold">{n}</p>
        <Caption>{name}</Caption>
      </div>
      <div className="relative basis-36 rounded-r">
        <img
          alt="Quiz classroom"
          className="h-16 w-full"
          src={background || QuizBackground}
        />
        <p className="absolute bottom-1.5 right-1.5 rounded-xl bg-secondary px-2 py-1 text-[0.725rem] font-bold text-white">
          {time} sec
        </p>
      </div>
    </div>
  )
}
