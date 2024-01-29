import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import { QuizType } from "@quizzy/common"
import { useQuery } from "@tanstack/react-query"
import { useSecuredRequest } from "entities/account"
import { Box } from "shared/ui/Box"
import { Subheading } from "shared/ui/Typography"
import { Button } from "shared/ui/Button"
import { MiniQuiz } from "./MiniQuiz"

export function MyQuizzes() {
  const request = useSecuredRequest()
  const [noMore, setNoMore] = useState(false)
  const [page, setPage] = useState(1)
  const { data, isLoading } = useQuery({
    queryKey: ["ownQuizzes", page],
    queryFn: () => request<QuizType[]>("/api/quiz/list/own", { page }),
    refetchOnWindowFocus: false,
  })

  return (
    <Box className="basis-80">
      <Subheading className="mb-5">My Quizzes</Subheading>
      <div className="flex flex-col gap-2.5">
        {isLoading ? (
          <>
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton height={50} />
          </>
        ) : (
          data?.map((quiz) => (
            <MiniQuiz
              key={quiz.id}
              cover={quiz.cover}
              id={quiz.id}
              name={quiz.name}
              plays={quiz.plays}
            />
          ))
        )}
      </div>
      {!noMore && (
        <Button
          className="mx-auto mt-5 block px-5"
          size="sm"
          type="button"
          variant="white"
          onClick={() => setPage((prev) => prev + 1)}>
          See more
        </Button>
      )}
    </Box>
  )
}
