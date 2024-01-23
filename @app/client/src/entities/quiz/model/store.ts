import { QuizAction } from "./actions"

export interface QuizState {
  isLoading: boolean
}

const initialState = {
  isLoading: false,
}

export const quizReducer = (
  state: QuizState = initialState,
  action: QuizAction
) => {
  switch (action.type) {
    case "TOGGLE_IS_LOADING":
      return { ...state, isLoading: !state.isLoading }
    default:
      return state
  }
}
