import { QuestionType } from "@quizzy/common"
import { QuestionIcon } from "shared/icons/QuestionIcon"
import { ProgressBar } from "../ProgressBar"

interface QuestionStageProps {
  question: QuestionType
  progressBar: number
}

export function QuestionStage({ question, progressBar }: QuestionStageProps) {
  return (
    <div className="absolute h-full w-full">
      <img
        alt="Quiz"
        className="absolute left-0 top-0 -z-10 h-full w-full object-cover"
        src={question.background}
      />
      <div className="flex h-full w-full flex-col justify-between">
        <div />
        <div>
          <QuestionIcon
            className="mx-auto mb-6 drop-shadow"
            color="none"
            height={6}
            width={6}
          />
          <div className="bg-white py-7 shadow-lg">
            <h2 className="text-center text-2xl font-bold text-black">
              {question.name} ?
            </h2>
          </div>
        </div>
        <ProgressBar progress={progressBar} />
      </div>
    </div>
  )
}
