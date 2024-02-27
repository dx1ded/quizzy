import { Caption } from "shared/ui/Typography"

interface QuestionProps {
  n: number
  name: string
  cover: string
  time: number
}

export function Question({ n, name, cover, time }: QuestionProps) {
  return (
    <div className="flex items-center justify-between rounded border border-gray">
      <div className="p-2">
        <p className="font-bold">{n}</p>
        <Caption className="inline-block lg:text-xs">{name}</Caption>
      </div>
      <div className="relative shrink-0 basis-36 lg:basis-24 md:basis-28">
        <img
          alt="Quiz classroom"
          className="h-16 w-full rounded-r"
          src={cover}
        />
        <p className="absolute bottom-1.5 right-1.5 rounded-xl bg-secondary px-2 py-1 text-[0.725rem] font-bold text-white lg:text-[0.625rem] md:text-[0.725rem]">
          {time} sec
        </p>
      </div>
    </div>
  )
}
