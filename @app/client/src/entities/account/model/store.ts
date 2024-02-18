import { AuthTokenType } from "@quizzy/common"
import { AccountAction } from "./actions"

export type AccountState = {
  token: AuthTokenType["token"] | null
  id: number
  nickname: string
}

const initialState: AccountState = {
  token: JSON.parse(localStorage.getItem("secret_token")!),
  id: -1,
  nickname: "",
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
    case "SET_ID":
      return { ...state, id: action.payload }
    case "SET_NICKNAME":
      return { ...state, nickname: action.payload }
    default:
      return state
  }
}
