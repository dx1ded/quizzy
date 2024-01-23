import { AccountAction } from "./actions"

export interface AccountState {
  token: string | null
}

const initialState = {
  token: JSON.parse(localStorage.getItem("secret_token") || null!),
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
