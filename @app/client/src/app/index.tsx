import "./styles/index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Main } from "pages/main"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Main />} path="/" />
      </Routes>
    </BrowserRouter>
  )
}
