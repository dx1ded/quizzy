import { useContext } from "react"
import { QuestionIcon } from "shared/icons/QuestionIcon"
import { PlayContext } from "../../model"
import { ProgressBar } from "../ProgressBar"

export function QuestionStage() {
  const { state } = useContext(PlayContext)
  const question = state.questions[state.activeQuestion]

  return (
    <div className="absolute h-full w-full">
      <img
        alt="Quiz"
        className="fixed left-0 top-0 -z-10 h-full w-full object-cover"
        src={question.background}
      />
      <div className="flex h-full w-full flex-col justify-between">
        <div />
        <div>
          <QuestionIcon
            className="mx-auto mb-6 drop-shadow lg:mb-4 lg:w-20 md:mb-1 md:w-16 sm:mb-0"
            color="none"
            height={6}
            width={6}
          />
          <div className="bg-white px-4 py-7 shadow-lg lg:py-5 md:py-4">
            <h2 className="text-center text-2xl font-bold text-black lg:text-xl md:text-lg sm:text-base">
              {question.name}
            </h2>
          </div>
        </div>
        <ProgressBar progress={state.progressBar} />
      </div>
    </div>
  )
}
