import Skeleton from "react-loading-skeleton"
import { ListQuizzesType } from "@quizzy/common"
import { useQuery } from "@tanstack/react-query"
import { NavLink } from "react-router-dom"
import { useSecuredRequest } from "entities/account"
import { Box } from "shared/ui/Box"
import { Subheading } from "shared/ui/Typography"
import { MiniQuiz } from "./MiniQuiz"

export function MyQuizzes() {
  const request = useSecuredRequest()
  const { data, isLoading } = useQuery({
    queryKey: ["ownQuizzes"],
    queryFn: () =>
      request<ListQuizzesType>("/api/quiz/list/own?perPage=3&page=1"),
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
          data?.quizzes.map((quiz) => (
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
      <div className="mt-6 flex justify-center">
        <NavLink className="flex text-sm font-semibold" to="/app/library">
          See more (
          {isLoading ? (
            <Skeleton width={20} />
          ) : (
            <span className="text-secondary">{data?.count}</span>
          )}
          )
        </NavLink>
      </div>
    </Box>
  )
}
