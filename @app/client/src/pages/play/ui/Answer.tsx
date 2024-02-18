import { useContext } from "react"
import { Cross } from "shared/icons/Cross"
import { Tick } from "shared/icons/Tick"
import { PlayContext } from "../model"

interface AnswerProps {
  name: string
  isCorrect?: boolean | undefined
}

export function TriangleAnswer({ name, isCorrect }: AnswerProps) {
  const { playerToken, sendJsonMessage } = useContext(PlayContext)

  const clickHandler = () => {
    if (isCorrect !== undefined) return

    sendJsonMessage({
      type: "answer",
      body: {
        playerToken,
        answerIndex: 0,
      },
    })
  }

  return (
    <div
      className={`flex w-full cursor-pointer items-center rounded bg-[#E01D3B] p-4 text-lg text-white shadow-lg ${
        isCorrect === false ? "opacity-70" : ""
      }`}
      onClick={clickHandler}>
      <div className="mr-4 border-x-[0.85rem] border-b-[1.5rem] border-transparent border-b-white" />
      <p>{name}</p>
      {isCorrect && <Tick className="ml-auto" width={2} />}
      {!isCorrect && isCorrect !== undefined && (
        <Cross className="ml-auto" width={1.6} />
      )}
    </div>
  )
}

export function RhombusAnswer({ name, isCorrect }: AnswerProps) {
  const { playerToken, sendJsonMessage } = useContext(PlayContext)

  const clickHandler = () => {
    if (isCorrect !== undefined) return

    sendJsonMessage({
      type: "answer",
      body: {
        playerToken,
        answerIndex: 1,
      },
    })
  }

  return (
    <div
      className={`flex w-full cursor-pointer items-center rounded bg-[#1368CF] p-4 text-lg text-white shadow-lg ${
        isCorrect === false ? "opacity-70" : ""
      }`}
      onClick={clickHandler}>
      <div className="mr-4 h-[1.125rem] w-[1.125rem] rotate-45 bg-white" />
      <p>{name}</p>
      {isCorrect && <Tick className="ml-auto" width={2} />}
      {!isCorrect && isCorrect !== undefined && (
        <Cross className="ml-auto" width={1.6} />
      )}
    </div>
  )
}

export function CircleAnswer({ name, isCorrect }: AnswerProps) {
  const { playerToken, sendJsonMessage } = useContext(PlayContext)

  const clickHandler = () => {
    if (isCorrect !== undefined) return

    sendJsonMessage({
      type: "answer",
      body: {
        playerToken,
        answerIndex: 2,
      },
    })
  }

  return (
    <div
      className={`flex w-full cursor-pointer items-center rounded bg-[#FFB800] p-4 text-lg text-white shadow-lg ${
        isCorrect === false ? "opacity-70" : ""
      }`}
      onClick={clickHandler}>
      <div className="mr-4 h-6 w-6 rounded-full bg-white" />
      <p>{name}</p>
      {isCorrect && <Tick className="ml-auto" width={2} />}
      {!isCorrect && isCorrect !== undefined && (
        <Cross className="ml-auto" width={1.6} />
      )}
    </div>
  )
}

export function SquareAnswer({ name, isCorrect }: AnswerProps) {
  const { playerToken, sendJsonMessage } = useContext(PlayContext)

  const clickHandler = () => {
    if (isCorrect !== undefined) return

    sendJsonMessage({
      type: "answer",
      body: {
        playerToken,
        answerIndex: 3,
      },
    })
  }

  return (
    <div
      className={`flex w-full cursor-pointer items-center rounded bg-[#28BC01] p-4 text-lg text-white shadow-lg ${
        isCorrect === false ? "opacity-70" : ""
      }`}
      onClick={clickHandler}>
      <div className="mr-4 h-5 w-5 bg-white" />
      <p>{name}</p>
      {isCorrect && <Tick className="ml-auto" width={2} />}
      {!isCorrect && isCorrect !== undefined && (
        <Cross className="ml-auto" width={1.6} />
      )}
    </div>
  )
}
