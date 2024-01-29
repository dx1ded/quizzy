import { Dispatch } from "react"
import { FindQuizType, QuizType } from "@quizzy/common"
import { AppActions, AppStore } from "../../index"
import { sendSecuredRequest } from "../../account"

export type QuizAction =
  | { type: "SET_IS_LOADING"; payload: boolean }
  | { type: "SET_IS_SAVING"; payload: boolean }
  | { type: "SET_ERROR"; payload: boolean }
  | { type: "SET_IS_CREATOR"; payload: boolean }
  | { type: "SET_CREATOR_INFO"; payload: FindQuizType["creatorInfo"] }
  | { type: "SET_QUIZ"; payload: QuizType }
  | { type: "SAVE_QUIZ"; payload: QuizType }
  | { type: "ADD_QUESTION" }
  | { type: "DUPLICATE_QUESTION"; payload: number }
  | { type: "REMOVE_QUESTION"; payload: number }
  | { type: "CHANGE_ACTIVE_QUESTION"; payload: number }

export function setIsLoading(value: boolean): QuizAction {
  return { type: "SET_IS_LOADING", payload: value }
}

export function setIsSaving(value: boolean): QuizAction {
  return { type: "SET_IS_SAVING", payload: value }
}

export function setError(value: boolean): QuizAction {
  return { type: "SET_ERROR", payload: value }
}

export function setIsCreator(value: boolean): QuizAction {
  return { type: "SET_IS_CREATOR", payload: value }
}

export function setCreatorInfo(
  creator: FindQuizType["creatorInfo"]
): QuizAction {
  return { type: "SET_CREATOR_INFO", payload: creator }
}

export function setQuiz(quiz: QuizType): QuizAction {
  return { type: "SET_QUIZ", payload: quiz }
}

export function addQuestion(): QuizAction {
  return { type: "ADD_QUESTION" }
}

export function duplicateQuestion(index: number): QuizAction {
  return { type: "DUPLICATE_QUESTION", payload: index }
}

export function removeQuestion(index: number): QuizAction {
  return { type: "REMOVE_QUESTION", payload: index }
}

export function changeActiveQuestion(index: number): QuizAction {
  return { type: "CHANGE_ACTIVE_QUESTION", payload: index }
}

export function createNewQuiz() {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppStore) => {
    dispatch(setIsLoading(true))

    const data = (await sendSecuredRequest("/api/quiz/create/new", dispatch, {
      token: getState().account.token,
    })) as Awaited<Promise<QuizType>>

    dispatch(setIsLoading(false))

    return data
  }
}

export function loadQuiz(id: string) {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppStore) => {
    dispatch(setIsLoading(true))

    try {
      const data = (await sendSecuredRequest(`/api/quiz/${id}`, dispatch, {
        token: getState().account.token,
      })) as Awaited<Promise<FindQuizType>>

      dispatch(setQuiz(data.quiz))
      dispatch(setIsCreator(data.isCreator))
      dispatch(setCreatorInfo(data.creatorInfo))
    } catch (_) {
      dispatch(setError(true))
    }

    dispatch(setIsLoading(false))
  }
}

export function loadQuizForEdit(id: string) {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppStore) => {
    dispatch(setIsLoading(true))

    try {
      const quiz = (await sendSecuredRequest(`/api/quiz/edit/${id}`, dispatch, {
        token: getState().account.token,
      })) as Awaited<Promise<QuizType>>

      dispatch(setQuiz(quiz))

      return quiz
    } catch (_) {
      dispatch(setError(true))
    }

    dispatch(setIsLoading(false))
  }
}

export function saveQuiz() {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppStore) => {
    dispatch(setIsSaving(true))

    const state = getState()

    await sendSecuredRequest("/api/quiz/save", dispatch, {
      token: state.account.token,
      quiz: state.quiz.data,
    })

    dispatch(setIsSaving(false))
  }
}
