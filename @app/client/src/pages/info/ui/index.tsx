import { AppHeader } from "widgets/header"
import { Screen } from "widgets/screen"
import { Quiz } from "./Quiz"
import { Questions } from "./Questions"

export function Info() {
  return (
    <div className="pt-2">
      <AppHeader />
      <Screen>
        <Quiz />
        <Questions />
      </Screen>
    </div>
  )
}
