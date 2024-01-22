import "./styles/index.css"
import { Provider } from "react-redux"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Main } from "pages/main"
import { Auth } from "pages/auth"
import { Play } from "pages/play"
import { Home } from "pages/home"
import { Discover } from "pages/discover"
import { Info } from "pages/info"

import { PrivateRoutes, PublicRoutes, store } from "./model"

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoutes />}>
            <Route element={<Main />} path="/" />
            <Route element={<Play />} path="/play" />
            <Route element={<Auth />} path="/auth" />
          </Route>
          {/* Private Routes */}
          <Route element={<PrivateRoutes />}>
            <Route element={<Home />} path="/app" />
            <Route element={<Discover />} path="/app/discover" />
            <Route element={<Info />} path="/quiz/:id" />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
