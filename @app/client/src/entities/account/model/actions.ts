import { Dispatch } from "react"
import { AuthTokenType } from "@quizzy/common"
import { SignInFormProps, SignUpFormProps } from "shared/lib"

export type AccountAction =
  | { type: "LOG_IN"; payload: AuthTokenType["token"] }
  | { type: "LOG_OUT" }
  | { type: "SIGN_IN"; payload: SignInFormProps }
  | { type: "SIGN_UP"; payload: SignUpFormProps }

export function login(token: AuthTokenType["token"]): AccountAction {
  localStorage.setItem("secret_token", JSON.stringify(token))
  return { type: "LOG_IN", payload: token }
}

export function logout(): AccountAction {
  localStorage.removeItem("secret_token")
  return { type: "LOG_OUT" }
}

export function signUp(user: SignUpFormProps) {
  return async (dispatch: Dispatch<AccountAction>) => {
    const request = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })

    const { token } = (await request.json()) as Awaited<Promise<AuthTokenType>>

    dispatch(login(token))
  }
}

export function signIn(credentials: SignInFormProps) {
  return async (dispatch: Dispatch<AccountAction>) => {
    const request = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })

    const { token } = (await request.json()) as Awaited<Promise<AuthTokenType>>

    dispatch(login(token))
  }
}
