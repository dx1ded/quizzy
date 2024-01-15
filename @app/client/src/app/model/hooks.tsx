import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"
import { AccountState } from "entites/account"
import { AppStore } from "./store"

export function PrivateRoutes() {
  const { token } = useSelector<AppStore, AccountState>(
    (state) => state.account
  )

  return token ? <Outlet /> : <Navigate to="/auth" />
}

export function PublicRoutes() {
  const { token } = useSelector<AppStore, AccountState>(
    (state) => state.account
  )

  return token && window.location.pathname === "/auth" ? (
    <Navigate to="/app" />
  ) : (
    <Outlet />
  )
}
