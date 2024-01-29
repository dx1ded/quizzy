import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useQuery } from "@tanstack/react-query"
import { FindQuizType } from "@quizzy/common"
import { AppHeader } from "widgets/header"
import { Screen } from "widgets/screen"
import { setCreatorInfo, setIsCreator, setQuiz } from "entities/quiz"
import { useSecuredRequest } from "entities/account"
import { NotFound } from "shared/ui/NotFound"
import { Quiz } from "./Quiz"
import { Questions } from "./Questions"

export function QuizInfo() {
  const dispatch = useDispatch()
  const request = useSecuredRequest()
  const { id } = useParams()
  const { isLoading, isError } = useQuery({
    queryKey: ["quizInfo"],
    queryFn: async () => {
      const data = await request<FindQuizType>(`/api/quiz/${id}`)
      dispatch(setQuiz(data.quiz))
      dispatch(setCreatorInfo(data.creatorInfo))
      dispatch(setIsCreator(data.isCreator))
      return data
    },
    refetchOnWindowFocus: false,
  })

  if (isError) return <NotFound />

  return (
    <div className="pt-2">
      <AppHeader />
      <Screen>
        <Quiz isLoading={isLoading} />
        <Questions isLoading={isLoading} />
      </Screen>
    </div>
  )
}
