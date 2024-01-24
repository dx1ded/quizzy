import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Skeleton from "react-loading-skeleton"
import { QuizType } from "@quizzy/common"
import { AppStore } from "entities"
import { AccountState, sendSecuredRequest } from "entities/account"
import { Box } from "shared/ui/Box"
import { Subheading, Text } from "shared/ui/Typography"
import { Button } from "shared/ui/Button"
import { AddQuizBox, QuizBox } from "./QuizBox"

export function GetStarted() {
  const { token } = useSelector<AppStore, AccountState>(
    (state) => state.account
  )
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [quizzes, setQuizzes] = useState<QuizType[]>([])

  useEffect(() => {
    setIsLoading(true)
    sendSecuredRequest("/api/quiz/get", dispatch, {
      token,
      page,
    }).then((data) => {
      setQuizzes((prev) => [...prev, ...data])
      setIsLoading(false)
    })
  }, [dispatch, page, token])

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
          quizzes.map((quiz) => (
            <QuizBox
              key={quiz.id}
              description={quiz.description}
              id={quiz.id}
              name={quiz.name}
              picture={quiz.picture}
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
