import "./styles/index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Main } from "pages/main"
import { Auth } from "pages/auth"
import { Play } from "pages/play"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Main />} path="/" />
        <Route element={<Auth />} path="/auth" />
        <Route element={<Play />} path="/play" />
      </Routes>
    </BrowserRouter>
  )
}
