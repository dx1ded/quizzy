import { combineReducers } from "redux"
import { accountReducer } from "entities/account"
import { quizReducer } from "entities/quiz"

export const rootReducer = combineReducers({
  account: accountReducer,
  quiz: quizReducer,
})

export type AppStore = ReturnType<typeof rootReducer>
