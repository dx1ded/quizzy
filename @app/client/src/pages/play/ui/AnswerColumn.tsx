import { Tick } from "shared/icons/Tick"

interface AnswerColumnProps {
  answers: number
  players: number
  isCorrect: boolean
}

export function TriangleAnswerColumn({
  answers,
  players,
  isCorrect,
}: AnswerColumnProps) {
  return (
    <div className="w-32">
      <div className="flex h-72 items-end lg:h-60 md:h-52">
        <div
          className="w-full bg-[#E01D3B]"
          style={{ height: `${(answers / players) * 100}%` }}
        />
      </div>
      <div className="flex items-center justify-center gap-1.5 bg-[#D80021] py-1">
        <div className="border-x-[0.35rem] border-b-[0.6rem] border-transparent border-b-white" />
        <span className="text-sm font-bold text-white">{answers}</span>
        {isCorrect && <Tick color="#fff" width={1.1} />}
      </div>
    </div>
  )
}

export function RhombusAnswerColumn({
  answers,
  players,
  isCorrect,
}: AnswerColumnProps) {
  return (
    <div className="w-32">
      <div className="flex h-72 items-end lg:h-60 md:h-52">
        <div
          className="w-full bg-[#1368CF]"
          style={{ height: `${(answers / players) * 100}%` }}
        />
      </div>
      <div className="flex items-center justify-center gap-1.5 bg-[#0159C5] py-1">
        <div className="h-2 w-2 rotate-45 bg-white" />
        <span className="text-sm font-bold text-white">{answers}</span>
        {isCorrect && <Tick color="#fff" width={1.1} />}
      </div>
    </div>
  )
}

export function CircleAnswerColumn({
  answers,
  players,
  isCorrect,
}: AnswerColumnProps) {
  return (
    <div className="w-32">
      <div className="flex h-72 items-end lg:h-60 md:h-52">
        <div
          className="w-full bg-[#FFB800]"
          style={{ height: `${(answers / players) * 100}%` }}
        />
      </div>
      <div className="flex items-center justify-center gap-1.5 bg-[#E2A300] py-1">
        <div className="h-2.5 w-2.5 rounded-full bg-white" />
        <span className="text-sm font-bold text-white">{answers}</span>
        {isCorrect && <Tick color="#fff" width={1.1} />}
      </div>
    </div>
  )
}

export function SquareAnswerColumn({
  answers,
  players,
  isCorrect,
}: AnswerColumnProps) {
  return (
    <div className="w-32">
      <div className="flex h-72 items-end lg:h-60 md:h-52">
        <div
          className="w-full bg-[#28BC01]"
          style={{ height: `${(answers / players) * 100}%` }}
        />
      </div>
      <div className="flex items-center justify-center gap-1.5 bg-[#23A900] py-1">
        <div className="h-2 w-2 bg-white" />
        <span className="text-sm font-bold text-white">{answers}</span>
        {isCorrect && <Tick color="#fff" width={1.1} />}
      </div>
    </div>
  )
}
