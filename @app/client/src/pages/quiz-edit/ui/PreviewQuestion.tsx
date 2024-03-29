import {
  DeleteQuestion,
  DuplicateQuestion,
  SwitchQuestion,
  SmallCircleAnswer,
  SmallRhombusAnswer,
  SmallSquareAnswer,
  SmallTriangleAnswer,
} from "features/edit-quiz"
import { Trash } from "shared/icons/Trash"
import { Copy } from "shared/icons/Copy"

interface PreviewQuestionProps {
  n: number
  name: string
  picture?: string
  background: string
  answers: string[]
  checked: boolean[]
  isActive: boolean
  isPublished: boolean
}

export function PreviewQuestion({
  n,
  name,
  picture,
  background,
  answers,
  checked,
  isActive,
  isPublished,
}: PreviewQuestionProps) {
  return (
    <div
      className="flex h-24 flex-shrink-0 rounded p-1"
      style={{
        backgroundColor: isActive ? "rgba(200, 200, 200, 0.3)" : "#fff",
      }}>
      <div className="mr-2 flex flex-col py-0.5 text-center">
        <p className="text-sm font-bold">{n + 1}</p>
        <DeleteQuestion
          render={() => (
            <button
              className="mb-2 mt-auto block"
              disabled={isPublished}
              type="button">
              <Trash color="#FF0000" width={0.8} />
            </button>
          )}
        />
        <DuplicateQuestion
          render={() => (
            <button className="block" disabled={isPublished} type="button">
              <Copy width={0.8} />
            </button>
          )}
        />
      </div>
      <SwitchQuestion
        n={n}
        render={() => (
          <div className="relative flex-1 cursor-pointer">
            <img
              alt="Quiz"
              className="absolute left-0 top-0 h-full w-full rounded object-cover"
              src={background}
            />
            <div className="relative z-10 flex h-full flex-col items-center justify-between px-1 py-2">
              <p className="inline-block max-w-[7rem] overflow-hidden truncate rounded-sm bg-white px-1 py-0.5 text-center text-[0.3rem]">
                {name}
              </p>
              {picture && (
                <img
                  alt="Quiz"
                  className="h-6 w-12 rounded-sm bg-white object-cover"
                  src={picture}
                />
              )}
              <div className="grid h-4 w-full grid-cols-2 gap-0.5">
                <SmallTriangleAnswer isChecked={checked[0]}>
                  {answers[0]}
                </SmallTriangleAnswer>
                <SmallRhombusAnswer isChecked={checked[1]}>
                  {answers[1]}
                </SmallRhombusAnswer>
                <SmallCircleAnswer isChecked={checked[2]}>
                  {answers[2]}
                </SmallCircleAnswer>
                <SmallSquareAnswer isChecked={checked[3]}>
                  {answers[3]}
                </SmallSquareAnswer>
              </div>
            </div>
          </div>
        )}
      />
    </div>
  )
}
