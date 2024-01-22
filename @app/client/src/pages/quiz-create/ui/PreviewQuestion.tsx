import { Trash } from "shared/icons/Trash"
import { Copy } from "shared/icons/Copy"
import {
  SmallCircleAnswer,
  SmallRhombusAnswer,
  SmallSquareAnswer,
  SmallTriangleAnswer,
} from "shared/ui/Answer"

interface PreviewQuestionProps {
  n: number
  bg: string
  name: string
  image?: string
  answers: string[]
  /**
   * Contains indexes: 0, 1, 2, 3
   */
  checked: number[]
  isActive?: boolean
}

export function PreviewQuestion({
  n,
  bg,
  name,
  image,
  answers,
  checked,
  isActive = false,
}: PreviewQuestionProps) {
  return (
    <div
      className="flex h-24 rounded p-1"
      style={{
        backgroundColor: isActive ? "rgba(200, 200, 200, 0.3)" : "#fff",
      }}>
      <div className="mr-2 flex flex-col py-0.5 text-center">
        <p className="text-sm font-bold">{n}</p>
        <button className="mb-2 mt-auto block" type="button">
          <Trash color="#FF0000" width={0.8} />
        </button>
        <button className="block" type="button">
          <Copy width={0.8} />
        </button>
      </div>
      <div className="relative flex-1 cursor-pointer">
        <img
          alt="Quiz"
          className="absolute left-0 top-0 h-full w-full rounded object-cover"
          src={bg}
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-between px-1 py-2">
          <p className="inline-block rounded-sm bg-white px-1 py-0.5 text-[0.3rem]">
            {name}
          </p>
          {image && (
            <img
              alt="Quiz"
              className="h-6 w-14 rounded-sm bg-white"
              src={image}
            />
          )}
          <div className="grid h-4 w-full grid-cols-2 gap-0.5">
            <SmallTriangleAnswer isChecked={checked.includes(0)}>
              {answers[0]}
            </SmallTriangleAnswer>
            <SmallRhombusAnswer isChecked={checked.includes(1)}>
              {answers[1]}
            </SmallRhombusAnswer>
            <SmallCircleAnswer isChecked={checked.includes(2)}>
              {answers[2]}
            </SmallCircleAnswer>
            <SmallSquareAnswer isChecked={checked.includes(3)}>
              {answers[3]}
            </SmallSquareAnswer>
          </div>
        </div>
      </div>
    </div>
  )
}
