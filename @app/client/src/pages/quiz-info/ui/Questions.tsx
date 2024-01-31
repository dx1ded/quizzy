import { useSelector } from "react-redux"
import Skeleton from "react-loading-skeleton"
import { QuizState } from "entities/quiz"
import { Box } from "shared/ui/Box"
import { Subheading } from "shared/ui/Typography"
import type { AppStore } from "app/model"
import { Question } from "./Question"

export function Questions({ isLoading }: { isLoading: boolean }) {
  const { data } = useSelector<AppStore, QuizState>((state) => state.quiz)

  return (
    <Box className="h-full flex-1">
      <Subheading className="mb-5 flex">
        Questions (
        {isLoading ? (
          <Skeleton containerClassName="mx-1" width={30} />
        ) : (
          <span className="text-secondary">{data.questions.length}</span>
        )}
        )
      </Subheading>
      <div className="flex flex-col gap-3">
        {isLoading ? (
          <>
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton height={50} />
          </>
        ) : (
          data.questions.map((question, i) => (
            <Question
              key={i}
              cover={question.background}
              n={i + 1}
              name={question.name}
              time={question.timeLimit}
            />
          ))
        )}
      </div>
    </Box>
  )
}
