import _ from "lodash"
import { useCallback, useEffect, useMemo, useState } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { FieldErrors, FormProvider, useForm } from "react-hook-form"
import { useDebouncedCallback } from "use-debounce"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  DraftQuizSchema,
  DraftQuizType,
  GetQuizForEditType,
  PublishedQuizSchema,
} from "@quizzy/common"
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
  setIsPublished,
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
  const data = useSelector<AppStore, QuizState["data"]>(
    (state) => state.quiz.data
  )
  const { isSaving, isTouched, isPublished } = useSelector<
    AppStore,
    Pick<QuizState, "isSaving" | "isTouched" | "isPublished">
  >(
    (state) => ({
      isSaving: state.quiz.isSaving,
      isTouched: state.quiz.isTouched,
      isPublished: state.quiz.isPublished,
    }),
    shallowEqual
  )

  const [modalOpen, setModalOpen] = useState(false)
  const [messageOpen, setMessageOpen] = useState(false)

  const { isLoading, isError } = useQuery({
    queryKey: ["quizEdit"],
    queryFn: async () => {
      const result = await request<GetQuizForEditType>(
        `/api/quiz/getForEdit/${id}`
      )
      dispatch(setQuiz(result.quiz, false))
      dispatch(setIsPublished(result.isPublished))
      return result.quiz
    },
    refetchOnWindowFocus: false,
  })

  const methods = useForm({
    values: data,
    resolver: zodResolver(
      isPublished
        ? PublishedQuizSchema.omit({
            rating: true,
            plays: true,
            favoriteBy: true,
          })
        : DraftQuizSchema
    ),
  })

  const submitHandler = useCallback(
    (newData: DraftQuizType) => {
      if (_.isEqual(newData, data)) return
      dispatch(setQuiz(newData, true))
    },
    [dispatch, data]
  )

  const errorHandler = useCallback(
    (errors: FieldErrors<DraftQuizType>) => {
      if (errors.description) return setModalOpen(true)
      else if (!errors.questions) return

      const index = +Object.keys(errors.questions)[0]

      dispatch(changeActiveQuestion(index))
    },
    [dispatch]
  )

  const debouncedSave = useDebouncedCallback(() => {
    dispatch(setIsSaving(true))
    request<DraftQuizType>("/api/quiz/save", {
      method: "PATCH",
      body: { quiz: data },
    }).then((quiz) => {
      dispatch(setIsSaving(false))
      dispatch(setQuiz(quiz))
    })
  }, 1500)

  const debouncedSubmit = useDebouncedCallback(() => {
    methods.handleSubmit(submitHandler, errorHandler)()
  }, 500)

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
      submitHandler: methods.handleSubmit(submitHandler, errorHandler),
    }),
    [modalOpen, messageOpen, methods, submitHandler, errorHandler]
  )

  if (isLoading) return <Loader />
  else if (isError) return <NotFound />

  return (
    <EditContext.Provider value={contextValue}>
      <Snackbar message="Saving your quiz" open={isSaving} />
      <FileTooLargeMessage />
      <FormProvider {...methods}>
        <form className="min-w-[70rem]" onChange={debouncedSubmit}>
          <SettingsModal />
          <Header />
          <div className="flex h-[calc(100vh-5.125rem)] min-h-[42rem]">
            <Preview />
            <Question />
            <Settings submit={debouncedSubmit} />
          </div>
        </form>
      </FormProvider>
    </EditContext.Provider>
  )
}
