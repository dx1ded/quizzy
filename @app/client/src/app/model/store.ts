import { legacy_createStore as createStore, applyMiddleware } from "redux"
import { thunk, ThunkMiddleware } from "redux-thunk"
import { composeWithDevTools } from "@redux-devtools/extension"
import { AppActions } from "../lib"
import { rootReducer } from "./rootReducer"

type AppState = ReturnType<typeof rootReducer>

export const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(
    applyMiddleware(thunk as unknown as ThunkMiddleware<AppState, AppActions>)
  )
)

export type AppStore = ReturnType<typeof rootReducer>
