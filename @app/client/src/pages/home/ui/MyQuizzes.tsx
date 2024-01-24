import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import { QuizType } from "@quizzy/common"
import { AppStore } from "entities"
import { AccountState, sendSecuredRequest } from "entities/account"
import { Box } from "shared/ui/Box"
import { Subheading } from "shared/ui/Typography"
import { Button } from "shared/ui/Button"
import { Quiz } from "./Quiz"

export function MyQuizzes() {
  const { token } = useSelector<AppStore, AccountState>(
    (state) => state.account
  )
  const dispatch = useDispatch()
  const [noMore, setNoMore] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [quizzes, setQuizzes] = useState<QuizType[]>([])

  useEffect(() => {
    setIsLoading(true)
    sendSecuredRequest("/api/quiz/getOwn", dispatch, {
      token,
      page,
    }).then((data) => {
      if (!data.length) setNoMore(true)
      setQuizzes((prev) => [...prev, ...data])
      setIsLoading(false)
    })
  }, [dispatch, page, token])

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
          quizzes.map((quiz) => (
            <Quiz
              key={quiz.id}
              id={quiz.id}
              name={quiz.name}
              picture={quiz.picture}
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
