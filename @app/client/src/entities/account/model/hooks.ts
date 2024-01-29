import { useDispatch, useSelector } from "react-redux"
import type { AppStore } from "app/model"
import { logout } from "./actions"
import { AccountState } from "./store"

export function useSecuredRequest() {
  const dispatch = useDispatch()
  const { token } = useSelector<AppStore, AccountState>(
    (state) => state.account
  )

  return function send<T = unknown>(url: string, body = {}): Promise<T> {
    if (!token) {
      dispatch(logout())
      return Promise.reject()
    }

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        ...body,
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
