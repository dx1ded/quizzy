import { useState } from "react"
import Skeleton from "react-loading-skeleton"
import { QuizType } from "@quizzy/common"
import { useQuery } from "@tanstack/react-query"
import { useSecuredRequest } from "entities/account"
import { Box } from "shared/ui/Box"
import { Subheading, Text } from "shared/ui/Typography"
import { Button } from "shared/ui/Button"
import { AddQuizBox, QuizBox } from "./QuizBox"

export function GetStarted() {
  const request = useSecuredRequest()
  const [page, setPage] = useState(1)
  const { data, isLoading } = useQuery({
    queryKey: ["quizzesList"],
    queryFn: () => request<QuizType[]>("/api/quiz/list", { page }),
    refetchOnWindowFocus: false,
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
          data?.map((quiz) => (
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
        onClick={() => setPage((prev) => prev + 1)}>
        Load more
      </Button>
    </Box>
  )
}
