import { combineReducers } from "redux"
import { accountReducer, AccountAction } from "./account"
import { quizReducer, QuizAction } from "./quiz"

export const rootReducer = combineReducers({
  account: accountReducer,
  quiz: quizReducer,
})

export type AppStore = ReturnType<typeof rootReducer>
export type AppActions = AccountAction | QuizAction
