import { legacy_createStore as createStore, applyMiddleware } from "redux"
import { thunk, ThunkMiddleware } from "redux-thunk"
import { composeWithDevTools } from "@redux-devtools/extension"
import { rootReducer, AppStore, AppActions } from "entities"

export const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(
    applyMiddleware(thunk as unknown as ThunkMiddleware<AppStore, AppActions>)
  )
)
