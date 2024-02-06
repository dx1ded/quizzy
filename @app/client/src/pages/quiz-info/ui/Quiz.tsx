import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import Skeleton from "react-loading-skeleton"
import { SetFavoriteQuiz } from "features/set-favorite-quiz"
import { QuizState } from "entities/quiz"
import { Box } from "shared/ui/Box"
import { QuizzyImage } from "shared/ui/QuizzyImage"
import { Caption, Subheading } from "shared/ui/Typography"
import { Button } from "shared/ui/Button"
import { Edit } from "shared/icons/Edit"
import type { AppStore } from "app/model"

export function Quiz({ isLoading }: { isLoading: boolean }) {
  const { data, creatorInfo, isCreator } = useSelector<AppStore, QuizState>(
    (state) => state.quiz
  )

  return isLoading ? (
    <Skeleton containerClassName="h-full" height="100%" width={320} />
  ) : (
    <Box className="h-full basis-80 !px-0 pt-0">
      {data.cover ? (
        <img
          alt="Quiz"
          className="mb-3 h-[7.25rem] w-full rounded-t-md object-cover"
          src={data.cover}
        />
      ) : (
        <QuizzyImage
          className="mb-3 rounded-t-md"
          height="7.25rem"
          size={1.5}
          width="100%"
        />
      )}
      <div className="px-4">
        <div className="mb-2 flex items-center justify-between">
          <Subheading>{data.name}</Subheading>
          <SetFavoriteQuiz />
        </div>
        <Caption className="mb-5 block">{data.plays} plays</Caption>
        <div className="mb-6 flex items-center justify-between">
          <Button className="px-8" variant="secondary">
            Start
          </Button>
          {isCreator && (
            <NavLink to={`/quiz/edit/${data.id}`}>
              <Edit width={1} />
            </NavLink>
          )}
        </div>
        <Caption className="mb-6 block text-[rgba(0,0,0,0.5)]">
          {data.description}
        </Caption>
        <div className="flex items-center gap-1.5">
          <div className="h-7 w-7 rounded-full bg-gray" />
          <Caption className="font-bold">@{creatorInfo.username}</Caption>
        </div>
      </div>
    </Box>
  )
}
