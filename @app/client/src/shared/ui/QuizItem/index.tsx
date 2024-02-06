import { SearchQuizType } from "@quizzy/common"
import { NavLink } from "react-router-dom"
import { Edit } from "../../icons/Edit"
import { More } from "../../icons/More"
import { Button } from "../Button"
import { Checkbox } from "../Checkbox"
import { QuizzyImage } from "../QuizzyImage"
import { Text } from "../Typography"

interface QuizItemProps {
  quiz: SearchQuizType
  noEdit?: boolean
  creatorInfo: {
    id: number
    username: string
  }
}

export function QuizItem({ quiz, creatorInfo, noEdit = false }: QuizItemProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray bg-white pl-4 pr-3">
      {!noEdit && (
        <Checkbox className="h-[1.125rem] w-[1.125rem]" name="edit" />
      )}
      <div className="relative">
        {quiz.cover ? (
          <img alt="Quiz" className="h-20 w-40 object-cover" src={quiz.cover} />
        ) : (
          <QuizzyImage height="5rem" width="10rem" />
        )}
        <span className="absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-[0.75rem] text-white">
          {quiz.questions}
        </span>
      </div>
      <div className="flex h-full flex-1 pb-2.5 pt-3">
        <div className="flex flex-col items-start justify-between">
          <Text className="font-semibold leading-[1rem]">{quiz.name}</Text>
          <div className="flex items-center gap-1.5">
            <div className="h-5 w-5 rounded-full bg-gray" />
            <span className="text-[0.75rem]">@{creatorInfo.username}</span>
          </div>
        </div>
        <div className="ml-auto flex flex-col justify-between">
          {!noEdit && (
            <div className="flex items-center justify-end gap-2.5">
              <button type="button">
                <Edit color="#C8C8C8" height={0.875} width={0.875} />
              </button>
              <button type="button">
                <More color="#C8C8C8" height={0.875} width={0.875} />
              </button>
            </div>
          )}
          <div className="mt-auto flex items-center gap-3.5">
            <span className="text-[0.75rem] font-semibold">
              {quiz.plays} plays
            </span>
            <Button
              as={NavLink}
              className="px-6 py-1"
              size="md"
              to={`/quiz/${quiz.id}`}
              variant="secondary">
              Start
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
