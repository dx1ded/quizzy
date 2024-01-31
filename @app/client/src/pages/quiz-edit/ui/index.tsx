import _ from "lodash"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { FormProvider, useForm, useWatch } from "react-hook-form"
import { useDebouncedCallback } from "use-debounce"
import { zodResolver } from "@hookform/resolvers/zod"
import { QuizSchema, QuizType } from "@quizzy/common"
import { useQuery } from "@tanstack/react-query"
import { Snackbar } from "@mui/material"
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
  const { data, isSaving } = useSelector<AppStore, QuizState>(
    (state) => state.quiz
  )
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
  }, 1000)

  useEffect(() => {
    debouncedSubmit()
  }, [changes, debouncedSubmit])

  useEffect(() => {
    debouncedSave()
  }, [data, debouncedSave])

  if (isLoading) return <Loader />
  else if (isError) return <NotFound />

  return (
    <div>
      <Snackbar message="Saving your quiz" open={isSaving} />
      <FormProvider {...methods}>
        <Header />
        <div className="flex h-[48rem]">
          <Preview />
          <Question />
          <Settings />
        </div>
      </FormProvider>
    </div>
  )
}
