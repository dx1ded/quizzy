import { PropsWithChildren } from "react"
import { Tick } from "../../icons/Tick"

export function TriangleAnswer({ children }: PropsWithChildren) {
  return (
    <label
      className="flex w-full cursor-pointer items-center rounded bg-[#E01D3B] p-4 text-lg text-white shadow-lg"
      htmlFor="triangle-answer">
      <input
        className="visually-hidden peer"
        id="triangle-answer"
        name="quiz-answers"
        type="checkbox"
      />
      <span className="mr-4 border-x-[0.85rem] border-b-[1.5rem] border-transparent border-b-white" />
      {children}
      <span className="ml-auto flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-transparent text-transparent peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white">
        <Tick width={1.3} />
      </span>
    </label>
  )
}

export function RhombusAnswer({ children }: PropsWithChildren) {
  return (
    <label
      className="flex w-full cursor-pointer items-center rounded bg-[#1368CF] p-4 text-lg text-white shadow-lg"
      htmlFor="rhombus-answer">
      <input
        className="visually-hidden peer"
        id="rhombus-answer"
        name="quiz-answers"
        type="checkbox"
      />
      <span className="mr-4 h-[1.125rem] w-[1.125rem] rotate-45 bg-white" />
      {children}
      <span className="ml-auto flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-transparent text-transparent peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white">
        <Tick width={1.3} />
      </span>
    </label>
  )
}

export function CircleAnswer({ children }: PropsWithChildren) {
  return (
    <label
      className="flex w-full cursor-pointer items-center rounded bg-[#FFB800] p-4 text-lg text-white shadow-lg"
      htmlFor="circle-answer">
      <input
        className="visually-hidden peer"
        id="circle-answer"
        name="quiz-answers"
        type="checkbox"
      />
      <span className="mr-4 h-6 w-6 rounded-full bg-white" />
      {children}
      <span className="ml-auto flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-transparent text-transparent peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white">
        <Tick width={1.3} />
      </span>
    </label>
  )
}

export function SquareAnswer({ children }: PropsWithChildren) {
  return (
    <label
      className="flex w-full cursor-pointer items-center rounded bg-[#28BC01] p-4 text-lg text-white shadow-lg"
      htmlFor="square-answer">
      <input
        className="visually-hidden peer"
        id="square-answer"
        name="quiz-answers"
        type="checkbox"
      />
      <span className="mr-4 h-5 w-5 bg-white" />
      {children}
      <span className="ml-auto flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-transparent text-transparent peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white">
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
