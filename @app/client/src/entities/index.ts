import { combineReducers } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { accountReducer, AccountAction } from "./account"
import { quizReducer, QuizAction } from "./quiz"

export const rootReducer = combineReducers({
  account: accountReducer,
  quiz: quizReducer,
})

export type AppStore = ReturnType<typeof rootReducer>
export type AppActions = AccountAction | QuizAction

export type AppThunkDispatch = ThunkDispatch<AppStore, unknown, AppActions>
