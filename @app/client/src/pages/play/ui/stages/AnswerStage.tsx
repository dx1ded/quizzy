import { useContext } from "react"
import { Button } from "shared/ui/Button"
import { Caption, Heading, Subheading } from "shared/ui/Typography"
import { PlayContext } from "../../model"
import {
  CircleAnswer,
  RhombusAnswer,
  SquareAnswer,
  TriangleAnswer,
} from "../Answer"

export function AnswerStage() {
  const { state, playerToken, sendJsonMessage } = useContext(PlayContext)
  const question = state.questions[state.activeQuestion]
  const hasAnswered = state.answers.find(
    (answer) => answer.playerToken === playerToken
  )

  const clickAnswer = () => {
    sendJsonMessage({
      type: "answer",
      body: {
        playerToken,
        answerIndex: -1,
      },
    })
  }

  return (
    <div className="absolute h-full w-full">
      <img
        alt="Quiz"
        className="fixed left-0 top-0 -z-10 h-full w-full object-cover"
        src={question.background}
      />
      {hasAnswered ? (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="flex h-60 w-60 animate-pulse items-center justify-center rounded-full bg-secondary md:h-40 md:w-40">
            <h1 className="text-center font-lobster text-3xl text-white md:text-xl">
              Wait for players!
            </h1>
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col justify-between gap-4 px-6 py-8 lg:px-4 lg:py-6 md:px-3 md:py-4 sm:p-2 sm:pt-4">
          <div className="relative flex items-center justify-center">
            <div className="rounded-lg bg-white px-14 py-4 shadow-lg lg:px-8 lg:py-3 sm:px-4">
              <Subheading className="text-center">{question.name}</Subheading>
            </div>
            <Button
              className="absolute right-0 top-1/2 -translate-y-1/2 px-9 shadow-lg lg:top-[8rem] lg:px-5 md:px-4 md:text-xs"
              variant="secondary"
              onClick={clickAnswer}>
              Skip
            </Button>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex h-28 w-28 flex-shrink-0 items-center justify-center rounded-full bg-secondary shadow-lg lg:h-20 lg:w-20 sm:h-16 sm:w-16">
              <Heading className="text-white">
                {Math.round(
                  question.timeLimit -
                    (question.timeLimit / 100) * state.progressBar
                )}
              </Heading>
            </div>
            {question.picture && (
              <img
                alt="Quiz"
                className="xs:max-x-[12rem] h-72 w-full max-w-[24rem] rounded-lg object-cover lg:h-52 sm:h-40 sm:max-w-[16rem] xs:h-32 xss:h-28"
                src={question.picture}
              />
            )}
            <div>
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-secondary shadow-lg lg:mb-2 lg:h-10 lg:w-10 sm:mb-1 sm:h-8 sm:w-8">
                <Subheading className="font-bold text-white sm:text-sm">
                  {state.answers.length}
                </Subheading>
              </div>
              <div className="rounded bg-white px-5 py-1 shadow-lg lg:px-2 lg:py-0.5 sm:py-0">
                <Caption className="block font-semibold">answers</Caption>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:gap-3 md:gap-2 sm:grid-cols-1 sm:gap-1.5">
            <TriangleAnswer name={question.answers[0]} />
            <RhombusAnswer name={question.answers[1]} />
            <CircleAnswer name={question.answers[2]} />
            <SquareAnswer name={question.answers[3]} />
          </div>
        </div>
      )}
    </div>
  )
}
