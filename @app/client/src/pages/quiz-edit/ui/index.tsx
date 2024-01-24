import _ from "lodash"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { ThunkDispatch } from "redux-thunk"
import { FormProvider, useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { QuizSchema, QuizType } from "@quizzy/common"
import { useDebouncedCallback } from "use-debounce"
import { AppActions, AppStore } from "entities"
import {
  loadQuizForEdit,
  QuizState,
  saveQuiz,
  setError,
  setQuiz,
} from "entities/quiz"
import { Loader } from "shared/ui/Loader"
import { NotFound } from "shared/ui/NotFound"

import { Header } from "./Header"
import { Preview } from "./Preview"
import { Question } from "./Question"
import { Settings } from "./Settings"

export interface QuizParams {
  activeQuestion: QuizState["activeQuestion"]
}

export function QuizEdit() {
  const { id } = useParams()
  const { isLoading, hasError, data, activeQuestion } = useSelector<
    AppStore,
    QuizState
  >((state) => state.quiz)
  const dispatch = useDispatch<ThunkDispatch<AppStore, unknown, AppActions>>()
  const methods = useForm({
    values: data,
    resolver: zodResolver(QuizSchema),
  })

  const changes = useWatch({ control: methods.control })

  const submitHandler = (newData: QuizType) => {
    if (_.isEqual(changes, data)) return
    dispatch(setQuiz(newData))
  }

  const debouncedSave = useDebouncedCallback(() => dispatch(saveQuiz()), 3000)
  const debouncedSubmit = useDebouncedCallback(
    methods.handleSubmit(submitHandler),
    1000
  )

  // Loading quiz
  useEffect(() => {
    dispatch(loadQuizForEdit(id!))

    return () => {
      dispatch(setError(false))
    }
  }, [dispatch, id])

  // Debounced saving to the store
  useEffect(() => {
    debouncedSubmit()
  }, [debouncedSubmit, changes])

  // Debounced saving to the server
  useEffect(() => {
    debouncedSave()
  }, [debouncedSave, data])

  if (isLoading) return <Loader />
  else if (hasError) return <NotFound />

  return (
    <div>
      <FormProvider {...methods}>
        <Header activeQuestion={activeQuestion} />
        <div className="flex h-[48rem]">
          <Preview activeQuestion={activeQuestion} />
          <Question activeQuestion={activeQuestion} />
          <Settings activeQuestion={activeQuestion} />
        </div>
      </FormProvider>
    </div>
  )
}
