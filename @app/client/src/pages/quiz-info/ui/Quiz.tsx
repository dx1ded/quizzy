import { useContext } from "react"
import { NavLink } from "react-router-dom"
import Skeleton from "react-loading-skeleton"
import { StartQuiz } from "features/start-quiz/ui"
import { SetFavoriteQuiz } from "features/set-favorite-quiz"
import { QuizInfoContext } from "entities/quiz"
import { Box } from "shared/ui/Box"
import { Caption, Subheading } from "shared/ui/Typography"
import { Edit } from "shared/icons/Edit"

export function Quiz() {
  const { quiz, creatorInfo, isCreator, isLoading } =
    useContext(QuizInfoContext)

  return isLoading ? (
    <Skeleton containerClassName="h-full" height="100%" width={320} />
  ) : (
    <Box className="h-full basis-80 !px-0 pt-0">
      <img
        alt="Quiz"
        className="mb-3 h-[7.25rem] w-full rounded-t-md object-cover"
        src={quiz.cover}
      />
      <div className="px-4">
        <div className="mb-2 flex items-center justify-between">
          <Subheading>{quiz.name}</Subheading>
          <SetFavoriteQuiz />
        </div>
        <Caption className="mb-5 block">{quiz.plays} plays</Caption>
        <div className="mb-6 flex items-center justify-between">
          <StartQuiz quizId={quiz.id} />
          {isCreator && (
            <NavLink to={`/quiz/edit/${quiz.id}`}>
              <Edit width={1} />
            </NavLink>
          )}
        </div>
        <Caption className="mb-6 block text-[rgba(0,0,0,0.5)]">
          {quiz.description}
        </Caption>
        <div className="flex items-center gap-1.5">
          <img
            alt="Profile"
            className="h-7 w-7 rounded-full"
            src={creatorInfo.picture}
          />
          <Caption className="font-bold">@{creatorInfo.username}</Caption>
        </div>
      </div>
    </Box>
  )
}
