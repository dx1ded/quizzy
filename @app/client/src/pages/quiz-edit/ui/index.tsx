import _ from "lodash"
import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { FieldErrors, FormProvider, useForm } from "react-hook-form"
import { useDebouncedCallback } from "use-debounce"
import { zodResolver } from "@hookform/resolvers/zod"
import { QuizSchema, QuizType } from "@quizzy/common"
import { useQuery } from "@tanstack/react-query"
import { Snackbar } from "@mui/material"
import {
  EditContext,
  FileTooLargeMessage,
  SettingsModal,
} from "features/edit-quiz"
import { useSecuredRequest } from "entities/account"
import {
  changeActiveQuestion,
  QuizState,
  resetQuiz,
  setIsSaving,
  setQuiz,
} from "entities/quiz"
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
  const { data, isSaving, isTouched } = useSelector<AppStore, QuizState>(
    (state) => state.quiz
  )
  const [modalOpen, setModalOpen] = useState(false)
  const [messageOpen, setMessageOpen] = useState(false)
  const { isLoading, isError } = useQuery({
    queryKey: ["quizEdit"],
    queryFn: async () => {
      const quiz = await request<QuizType>(`/api/quiz/edit/${id}`)
      dispatch(setQuiz(quiz, false))
      return quiz
    },
    refetchOnWindowFocus: false,
  })

  const methods = useForm({
    values: data,
    resolver: zodResolver(QuizSchema),
  })

  const submitHandler = (newData: QuizType) => {
    if (_.isEqual(newData, data)) return
    dispatch(setQuiz(newData, true))
  }

  const errorHandler = (errors: FieldErrors<QuizType>) => {
    if (errors.description) return setModalOpen(true)
    else if (!errors.questions) return

    const index = +Object.keys(errors.questions)[0]

    dispatch(changeActiveQuestion(index))
  }

  const debouncedSave = useDebouncedCallback(() => {
    dispatch(setIsSaving(true))
    request("/api/quiz/save", { quiz: data }).then(() =>
      dispatch(setIsSaving(false))
    )
  }, 3000)

  const debouncedSubmit = useDebouncedCallback(() => {
    methods.handleSubmit(submitHandler, errorHandler)()
  }, 1000)

  useEffect(() => {
    if (!isTouched) return
    debouncedSave()
  }, [isTouched, data, debouncedSave, dispatch])

  // Clear store after unmount
  useEffect(() => {
    return () => {
      dispatch(resetQuiz())
    }
  }, [dispatch])

  const contextValue = useMemo(
    () => ({
      modalOpen,
      setModalOpen,
      messageOpen,
      setMessageOpen,
    }),
    [modalOpen, messageOpen]
  )

  if (isLoading) return <Loader />
  else if (isError) return <NotFound />

  return (
    <EditContext.Provider value={contextValue}>
      <Snackbar message="Saving your quiz" open={isSaving} />
      <FileTooLargeMessage />
      <FormProvider {...methods}>
        <form onChange={debouncedSubmit}>
          <SettingsModal />
          <Header />
          <div className="flex h-[48rem]">
            <Preview />
            <Question />
            <Settings submit={debouncedSubmit} />
          </div>
        </form>
      </FormProvider>
    </EditContext.Provider>
  )
}
