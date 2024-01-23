import { Dispatch } from "react"
import { z } from "zod"
import { QuizSchema } from "@quizzy/common"
import { AppActions, AppStore } from "../../index"
import { sendSecuredRequest } from "../../account"

type QuizType = z.infer<typeof QuizSchema>

export type QuizAction =
  | { type: "TOGGLE_IS_LOADING" }
  | { type: "SET_QUIZ"; payload: QuizType }

export function toggleIsLoading(): QuizAction {
  return { type: "TOGGLE_IS_LOADING" }
}

export function setQuiz(quiz: QuizType): QuizAction {
  return { type: "SET_QUIZ", payload: quiz }
}

export function createNewQuiz() {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppStore) => {
    dispatch(toggleIsLoading())

    const data = (await sendSecuredRequest("/api/quiz/create/new", dispatch, {
      token: getState().account.token,
    })) as Awaited<Promise<QuizType>>

    dispatch(toggleIsLoading())

    return data
  }
}
