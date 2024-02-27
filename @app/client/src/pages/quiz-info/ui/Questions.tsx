import { useContext } from "react"
import Skeleton from "react-loading-skeleton"
import { QuizInfoContext } from "entities/quiz"
import { Box } from "shared/ui/Box"
import { Subheading } from "shared/ui/Typography"
import { Question } from "./Question"

export function Questions() {
  const { quiz, isLoading } = useContext(QuizInfoContext)

  return (
    <Box className="h-full w-full flex-1 lg:px-3">
      <Subheading className="mb-5 flex lg:mb-4">
        Questions (
        {isLoading ? (
          <Skeleton containerClassName="mx-1" width={30} />
        ) : (
          <span className="text-secondary">{quiz.questions.length}</span>
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
          quiz.questions.map((question, i) => (
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
