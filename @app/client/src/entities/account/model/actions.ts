import { AuthTokenType } from "@quizzy/common"

export type AccountAction =
  | { type: "LOG_IN"; payload: AuthTokenType["token"] }
  | { type: "LOG_OUT" }

export function login(token: AuthTokenType["token"]): AccountAction {
  localStorage.setItem("secret_token", JSON.stringify(token))
  return { type: "LOG_IN", payload: token }
}

export function logout(): AccountAction {
  localStorage.removeItem("secret_token")
  return { type: "LOG_OUT" }
}
