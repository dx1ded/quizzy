import "./styles/index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Main } from "pages/main"
import { Auth } from "pages/auth"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Main />} path="/" />
        <Route element={<Auth />} path="/auth" />
      </Routes>
    </BrowserRouter>
  )
}
