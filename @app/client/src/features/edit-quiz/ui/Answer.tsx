import { PropsWithChildren } from "react"
import { useFormContext } from "react-hook-form"
import { DraftQuizType } from "@quizzy/common"
import { Tick } from "shared/icons/Tick"

export interface AnswerProps {
  value: string
  isChecked: boolean
  isPublished: boolean
  activeQuestion: number
}

export function TriangleAnswer({
  activeQuestion,
  isChecked,
  isPublished,
  value,
}: AnswerProps) {
  const { register } = useFormContext<DraftQuizType>()

  return (
    <label
      className="flex w-full cursor-pointer items-center rounded bg-[#E01D3B] p-4 text-lg text-white shadow-lg"
      htmlFor="triangle-answer">
      <input
        checked={isChecked}
        className="visually-hidden peer"
        disabled={isPublished}
        id="triangle-answer"
        type="checkbox"
        {...register(`questions.${activeQuestion}.correctAnswers.0`)}
      />
      <span className="mr-4 border-x-[0.85rem] border-b-[1.5rem] border-transparent border-b-white" />
      <input
        className="flex-1 bg-transparent outline-none"
        disabled={isPublished}
        type="text"
        value={value}
        {...register(`questions.${activeQuestion}.answers.0`)}
      />
      <span className="ml-4 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-transparent text-transparent peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white">
        <Tick width={1.3} />
      </span>
    </label>
  )
}

export function RhombusAnswer({
  activeQuestion,
  isChecked,
  isPublished,
  value,
}: AnswerProps) {
  const { register } = useFormContext<DraftQuizType>()

  return (
    <label
      className="flex w-full cursor-pointer items-center rounded bg-[#1368CF] p-4 text-lg text-white shadow-lg"
      htmlFor="rhombus-answer">
      <input
        checked={isChecked}
        className="visually-hidden peer"
        disabled={isPublished}
        id="rhombus-answer"
        type="checkbox"
        {...register(`questions.${activeQuestion}.correctAnswers.1`)}
      />
      <span className="mr-4 h-[1.125rem] w-[1.125rem] rotate-45 bg-white" />
      <input
        className="flex-1 bg-transparent outline-none"
        disabled={isPublished}
        type="text"
        value={value}
        {...register(`questions.${activeQuestion}.answers.1`)}
      />
      <span className="ml-4 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-transparent text-transparent peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white">
        <Tick width={1.3} />
      </span>
    </label>
  )
}

export function CircleAnswer({
  activeQuestion,
  isChecked,
  isPublished,
  value,
}: AnswerProps) {
  const { register } = useFormContext<DraftQuizType>()

  return (
    <label
      className="flex w-full cursor-pointer items-center rounded bg-[#FFB800] p-4 text-lg text-white shadow-lg"
      htmlFor="circle-answer">
      <input
        checked={isChecked}
        className="visually-hidden peer"
        disabled={isPublished}
        id="circle-answer"
        type="checkbox"
        {...register(`questions.${activeQuestion}.correctAnswers.2`)}
      />
      <span className="mr-4 h-6 w-6 rounded-full bg-white" />
      <input
        className="flex-1 bg-transparent outline-none"
        disabled={isPublished}
        type="text"
        value={value}
        {...register(`questions.${activeQuestion}.answers.2`)}
      />
      <span className="ml-4 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-transparent text-transparent peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white">
        <Tick width={1.3} />
      </span>
    </label>
  )
}

export function SquareAnswer({
  activeQuestion,
  isChecked,
  isPublished,
  value,
}: AnswerProps) {
  const { register } = useFormContext<DraftQuizType>()

  return (
    <label
      className="flex w-full cursor-pointer items-center rounded bg-[#28BC01] p-4 text-lg text-white shadow-lg"
      htmlFor="square-answer">
      <input
        checked={isChecked}
        className="visually-hidden peer"
        disabled={isPublished}
        id="square-answer"
        type="checkbox"
        {...register(`questions.${activeQuestion}.correctAnswers.3`)}
      />
      <span className="mr-4 h-5 w-5 bg-white" />
      <input
        className="flex-1 bg-transparent outline-none"
        disabled={isPublished}
        type="text"
        value={value}
        {...register(`questions.${activeQuestion}.answers.3`)}
      />
      <span className="ml-4 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-transparent text-transparent peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white">
        <Tick width={1.3} />
      </span>
    </label>
  )
}

// Small versions

interface SmallAnswer extends PropsWithChildren {
  isChecked?: boolean
}

export function SmallTriangleAnswer({ children, isChecked }: SmallAnswer) {
  const checkedClassName = `ml-auto flex h-1 w-1 items-center justify-center rounded-full border ${
    isChecked
      ? "border-secondary bg-secondary text-white"
      : "border-white bg-transparent text-transparent"
  }`

  return (
    <div className="flex items-center rounded-sm bg-[#E01D3B] px-1 py-[0.1rem] text-[0.2rem] text-white shadow-lg">
      <div className="mr-1 border-x-[0.1rem] border-b-[0.2rem] border-transparent border-b-white" />
      {children}
      <div className={checkedClassName}>
        <Tick width={0.1} />
      </div>
    </div>
  )
}

export function SmallRhombusAnswer({ children, isChecked }: SmallAnswer) {
  const checkedClassName = `ml-auto flex h-1 w-1 items-center justify-center rounded-full border ${
    isChecked
      ? "border-secondary bg-secondary text-white"
      : "border-white bg-transparent text-transparent"
  }`

  return (
    <div className="flex items-center rounded-sm bg-[#1368CF] px-1 py-[0.1rem] text-[0.2rem] text-white shadow-lg">
      <div className="mr-1 h-[0.2rem] w-[0.2rem] rotate-45 bg-white" />
      {children}
      <div className={checkedClassName}>
        <Tick width={0.1} />
      </div>
    </div>
  )
}

export function SmallCircleAnswer({ children, isChecked }: SmallAnswer) {
  const checkedClassName = `ml-auto flex h-1 w-1 items-center justify-center rounded-full border ${
    isChecked
      ? "border-secondary bg-secondary text-white"
      : "border-white bg-transparent text-transparent"
  }`

  return (
    <div className="flex items-center rounded-sm bg-[#FFB800] px-1 py-[0.1rem] text-[0.2rem] text-white shadow-lg">
      <span className="mr-1 h-1 w-1 rounded-full bg-white" />
      {children}
      <div className={checkedClassName}>
        <Tick width={0.1} />
      </div>
    </div>
  )
}

export function SmallSquareAnswer({ children, isChecked }: SmallAnswer) {
  const checkedClassName = `ml-auto flex h-1 w-1 items-center justify-center rounded-full border ${
    isChecked
      ? "border-secondary bg-secondary text-white"
      : "border-white bg-transparent text-transparent"
  }`

  return (
    <div className="flex items-center rounded-sm bg-[#28BC01] px-1 py-[0.1rem] text-[0.2rem] text-white shadow-lg">
      <span className="mr-1 h-1 w-1 bg-white" />
      {children}
      <div className={checkedClassName}>
        <Tick width={0.1} />
      </div>
    </div>
  )
}
