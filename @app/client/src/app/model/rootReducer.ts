import { combineReducers } from "redux"
import { accountReducer } from "entites/account"

export const rootReducer = combineReducers({
  account: accountReducer,
})
