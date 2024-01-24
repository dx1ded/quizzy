import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import Skeleton from "react-loading-skeleton"
import { Box } from "shared/ui/Box"
import { QuizzyImage } from "shared/ui/QuizzyImage"
import { Caption, Subheading } from "shared/ui/Typography"
// import { Star } from "shared/icons/Star"
import { Button } from "shared/ui/Button"
import { AppStore } from "entities"
import { QuizState } from "entities/quiz"
import { Edit } from "shared/icons/Edit"

export function Quiz() {
  const { data, creatorInfo, isCreator, isLoading } = useSelector<
    AppStore,
    QuizState
  >((state) => state.quiz)

  return isLoading ? (
    <Skeleton containerClassName="h-full" height="100%" width={320} />
  ) : (
    <Box className="h-full basis-80 !px-0 pt-0">
      {data.picture ? (
        <img alt="Quiz" src={data.picture} />
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
          {/* <button type="button"> */}
          {/*  <Star color="#FFB800" width={1.25} /> */}
          {/* </button> */}
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
