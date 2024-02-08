import { NavLink } from "react-router-dom"
import {
  EditName,
  DeleteQuiz,
  EditSettings,
  PublishQuiz,
} from "features/edit-quiz"
import { Logo } from "shared/ui/Logo"

export function Header() {
  return (
    <header className="flex items-center bg-white px-6 py-2 shadow">
      <Logo as={NavLink} className="mr-6" size={2.75} to="/app" />
      <EditName />
      <EditSettings />
      <div className="ml-auto flex gap-4">
        <DeleteQuiz />
        <PublishQuiz />
      </div>
    </header>
  )
}
