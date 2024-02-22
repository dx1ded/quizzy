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
          <div className="flex h-60 w-60 animate-pulse items-center justify-center rounded-full bg-secondary">
            <h1 className="text-center font-lobster text-3xl text-white">
              Wait for players!
            </h1>
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col justify-between px-6 py-8">
          <div className="relative flex items-center justify-center">
            <div className="rounded-lg bg-white px-14 py-4 shadow-lg">
              <Subheading>{question.name}</Subheading>
            </div>
            <Button
              className="absolute right-0 top-1/2 -translate-y-1/2 px-9 shadow-lg"
              variant="secondary"
              onClick={clickAnswer}>
              Skip
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-secondary shadow-lg">
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
                className="h-72 w-96 rounded-lg object-cover"
                src={question.picture}
              />
            )}
            <div>
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-secondary shadow-lg">
                <Subheading className="font-bold text-white">
                  {state.answers.length}
                </Subheading>
              </div>
              <div className="rounded bg-white px-5 py-1 shadow-lg">
                <Caption className="font-semibold">answers</Caption>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
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