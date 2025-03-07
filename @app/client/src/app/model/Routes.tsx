import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"
import { AccountState } from "entities/account"
import { AppStore } from "./rootReducer"

export function PrivateRoutes() {
  const token = useSelector<AppStore, AccountState["token"]>(
    (state) => state.account.token
  )

  return token ? <Outlet /> : <Navigate to="/auth" />
}

export function PublicRoutes() {
  const token = useSelector<AppStore, AccountState["token"]>(
    (state) => state.account.token
  )

  return token && window.location.pathname === "/auth" ? (
    <Navigate to="/app" />
  ) : (
    <Outlet />
  )
}
