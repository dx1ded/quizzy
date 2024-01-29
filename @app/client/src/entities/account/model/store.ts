import { AuthTokenType } from "@quizzy/common"
import { AccountAction } from "./actions"

export type AccountState = {
  token: AuthTokenType["token"] | null
}

const initialState: AccountState = {
  token: JSON.parse(localStorage.getItem("secret_token")!),
}

export const accountReducer = (
  state: AccountState = initialState,
  action: AccountAction
) => {
  switch (action.type) {
    case "LOG_IN":
      return { ...state, token: action.payload }
    case "LOG_OUT":
      return { ...state, token: null }
    default:
      return state
  }
}
