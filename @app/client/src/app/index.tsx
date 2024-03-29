import "./styles/index.css"
import { Provider } from "react-redux"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { Main } from "pages/main"
import { Auth } from "pages/auth"
import { Play } from "pages/play"
import { Join } from "pages/join"
import { Home } from "pages/home"
import { Discover } from "pages/discover"
import { QuizInfo } from "pages/quiz-info"
import { QuizEdit } from "pages/quiz-edit"
import { About } from "pages/about"
import { Library } from "pages/library"
import { Records } from "pages/records"

import { PrivateRoutes, PublicRoutes, store } from "./model"

const queryClient = new QueryClient()

export function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicRoutes />}>
              <Route element={<Main />} path="/" />
              <Route element={<Join />} path="/join" />
              <Route element={<Play />} path="/play" />
              <Route element={<Auth />} path="/auth" />
            </Route>
            {/* Private Routes */}
            <Route element={<PrivateRoutes />}>
              <Route element={<Home />} path="/app" index />
              <Route element={<Discover />} path="/app/discover" />
              <Route element={<Library />} path="/app/library" />
              <Route element={<Records />} path="/app/records" />
              <Route element={<About />} path="/app/about" />
              <Route element={<QuizInfo />} path="/quiz/:id" />
              <Route element={<QuizEdit />} path="/quiz/edit/:id" />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  )
}
