import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { GetQuizType } from "@quizzy/common"
import { AppHeader } from "widgets/header"
import { Screen } from "widgets/screen"
import { useSecuredRequest } from "entities/account"
import { QuizInfoProvider } from "entities/quiz"
import { NotFound } from "shared/ui/NotFound"
import { Quiz } from "./Quiz"
import { Questions } from "./Questions"

export function QuizInfo() {
  const request = useSecuredRequest()
  const { id } = useParams()
  const { data, isLoading, isError } = useQuery({
    queryKey: ["quizInfo"],
    queryFn: () => request<GetQuizType>(`/api/quiz/get/${id}`),
    refetchOnWindowFocus: false,
    retry: false,
  })

  if (isError) return <NotFound />

  return (
    <div className="pt-2">
      <AppHeader />
      <Screen>
        <QuizInfoProvider value={{ ...data!, isLoading }}>
          <Quiz />
          <Questions />
        </QuizInfoProvider>
      </Screen>
    </div>
  )
}
