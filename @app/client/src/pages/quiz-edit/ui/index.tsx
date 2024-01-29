import _ from "lodash"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { FormProvider, useForm, useWatch } from "react-hook-form"
import { useDebouncedCallback } from "use-debounce"
import { zodResolver } from "@hookform/resolvers/zod"
import { QuizSchema, QuizType } from "@quizzy/common"
import { useQuery } from "@tanstack/react-query"
import { useSecuredRequest } from "entities/account"
import { QuizState, setIsSaving, setQuiz } from "entities/quiz"
import { Loader } from "shared/ui/Loader"
import { NotFound } from "shared/ui/NotFound"
import type { AppStore } from "app/model"

import { Header } from "./Header"
import { Preview } from "./Preview"
import { Question } from "./Question"
import { Settings } from "./Settings"

export function QuizEdit() {
  const { id } = useParams()
  const request = useSecuredRequest()
  const dispatch = useDispatch()
  const { data } = useSelector<AppStore, QuizState>((state) => state.quiz)
  const { isLoading, isError } = useQuery({
    queryKey: ["quizEdit"],
    queryFn: async () => {
      const quiz = await request<QuizType>(`/api/quiz/edit/${id}`)
      dispatch(setQuiz(quiz))
      return quiz
    },
    refetchOnWindowFocus: false,
  })

  const methods = useForm({
    values: data,
    resolver: zodResolver(QuizSchema),
  })

  const changes = useWatch({ control: methods.control })

  const debouncedSave = useDebouncedCallback(() => {
    dispatch(setIsSaving(true))
    request("/api/quiz/save", { quiz: data }).then(() =>
      dispatch(setIsSaving(false))
    )
  }, 3000)

  const submitHandler = (newData: QuizType) => {
    if (_.isEqual(changes, data)) return
    dispatch(setQuiz(newData))
  }

  const debouncedSubmit = useDebouncedCallback(() => {
    methods.handleSubmit(submitHandler)()
    debouncedSave()
  }, 1000)

  if (isLoading) return <Loader />
  else if (isError) return <NotFound />

  return (
    <div>
      <FormProvider {...methods}>
        <Header />
        <form className="flex h-[48rem]" onChange={debouncedSubmit}>
          <Preview />
          <Question />
          <Settings />
        </form>
      </FormProvider>
    </div>
  )
}
