import Skeleton from "react-loading-skeleton"
import { QuizType } from "@quizzy/common"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useSecuredRequest } from "entities/account"
import { Box } from "shared/ui/Box"
import { Subheading, Text } from "shared/ui/Typography"
import { Button } from "shared/ui/Button"
import { AddQuizBox, QuizBox } from "./QuizBox"

export function GetStarted() {
  const request = useSecuredRequest()
  const { data, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ["quizzesList"],
    queryFn: ({ pageParam = 1 }) =>
      request<QuizType[]>("/api/quiz/list", { page: pageParam }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < 5 ? undefined : allPages.length + 1,
    initialPageParam: 1,
  })

  return (
    <Box className="flex-1">
      <Subheading className="mb-1">Let's get started</Subheading>
      <Text className="mb-5">
        Become a <span className="font-lobster text-secondary">Quizzy</span>{" "}
        master by practicing our top quizzes.
      </Text>
      <div className="grid grid-cols-3 gap-x-6 gap-y-7">
        <AddQuizBox />
        {isLoading ? (
          <>
            <Skeleton height={200} />
            <Skeleton height={200} />
            <Skeleton height={200} />
            <Skeleton height={200} />
            <Skeleton height={200} />
          </>
        ) : (
          data?.pages
            .flat()
            .map((quiz) => (
              <QuizBox
                key={quiz.id}
                cover={quiz.cover}
                description={quiz.description}
                id={quiz.id}
                name={quiz.name}
              />
            ))
        )}
      </div>
      <Button
        className="mx-auto mt-6 block px-6"
        size="md"
        variant="white"
        onClick={() => fetchNextPage()}>
        Load more
      </Button>
    </Box>
  )
}
