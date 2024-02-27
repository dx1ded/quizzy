import { useContext } from "react"
import { PlayContext } from "../../model"
import { ProgressBar } from "../ProgressBar"

export function GetReady() {
  const { state } = useContext(PlayContext)

  return (
    <div className="absolute h-full w-full">
      <img
        alt="Quiz"
        className="fixed left-0 top-0 -z-10 h-full w-full object-cover"
        src="https://firebasestorage.googleapis.com/v0/b/quizzy-222b7.appspot.com/o/quiz-background.png?alt=media"
      />
      <div className="flex h-full w-full flex-col items-center justify-between">
        <div />
        <div className="flex h-60 w-60 animate-bounce items-center justify-center rounded-full bg-secondary lg:h-48 lg:w-48">
          <h1 className="font-lobster text-5xl text-white lg:text-3xl">
            Get ready!
          </h1>
        </div>
        <ProgressBar progress={state.progressBar} />
      </div>
    </div>
  )
}
