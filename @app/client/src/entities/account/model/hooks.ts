import { useDispatch, useSelector } from "react-redux"
import type { AppStore } from "app/model"
import { logout } from "./actions"
import { AccountState } from "./store"

export function useSecuredRequest() {
  const dispatch = useDispatch()
  const { token } = useSelector<AppStore, AccountState>(
    (state) => state.account
  )

  return function send<T = unknown>(
    url: string,
    options?: { method?: string; body?: unknown }
  ): Promise<T> {
    if (!token) {
      dispatch(logout())
      return Promise.reject()
    }

    options = options || {}

    return fetch(url, {
      method: options.method || "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        ...(options.body ? options.body : {}),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw response.status
        } else {
          return response.json()
        }
      })
      .catch((errorStatus) => {
        if (errorStatus === 401) {
          dispatch(logout())
        }

        throw errorStatus
      })
  }
}
