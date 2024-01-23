import { Header } from "./Header"
import { Preview } from "./Preview"
import { Question } from "./Question"
import { Settings } from "./Settings"

export function QuizEdit() {
  return (
    <div>
      <Header />
      <div className="flex">
        <Preview />
        <Question />
        <Settings />
      </div>
    </div>
  )
}
