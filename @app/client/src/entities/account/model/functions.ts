import { Dispatch } from "react"
import { logout } from "./actions"
import { AppActions } from "../../index"

/**
 * Function sends a request to the server with verifying its secret token
 */
export function sendSecuredRequest<T>(
  url: string,
  dispatch: Dispatch<AppActions>,
  body: T
) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
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
