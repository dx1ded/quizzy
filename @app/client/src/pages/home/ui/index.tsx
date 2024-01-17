import { AppHeader } from "widgets/header"
import { Screen } from "widgets/screen"
import { MyQuizzes } from "./MyQuizzes"
import { GetStarted } from "./GetStarted"

export function Home() {
  return (
    <div className="pt-2">
      <AppHeader />
      <Screen>
        <MyQuizzes />
        <GetStarted />
      </Screen>
    </div>
  )
}
