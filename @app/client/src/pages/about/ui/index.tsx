import { AppHeader } from "widgets/header"
import { Screen } from "widgets/screen"
import { Logo } from "shared/ui/Logo"
import { Caption, Subheading } from "shared/ui/Typography"

export function About() {
  return (
    <div className="pt-2">
      <AppHeader />
      <Screen className="flex-col items-center justify-center !gap-3">
        <div className="flex h-44 w-44 items-center justify-center rounded-full bg-primary">
          <Logo color="#fff" size={2} />
        </div>
        <Subheading className="mb-0">Quizzy! App</Subheading>
        <Caption>created by Volodymyr Doskochynskyi</Caption>
      </Screen>
    </div>
  )
}
