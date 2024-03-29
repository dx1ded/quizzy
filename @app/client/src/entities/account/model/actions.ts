import { AuthTokenType } from "@quizzy/common"

export type AccountAction =
  | { type: "LOG_IN"; payload: AuthTokenType["token"] }
  | { type: "LOG_OUT" }
  | { type: "SET_ID"; payload: number }
  | { type: "SET_NICKNAME"; payload: string }

export function login(token: AuthTokenType["token"]): AccountAction {
  localStorage.setItem("secret_token", JSON.stringify(token))
  return { type: "LOG_IN", payload: token }
}

export function logout(): AccountAction {
  localStorage.removeItem("secret_token")
  return { type: "LOG_OUT" }
}

export function setId(id: number): AccountAction {
  return { type: "SET_ID", payload: id }
}

export function setNickname(nickname: string): AccountAction {
  return { type: "SET_NICKNAME", payload: nickname }
}
