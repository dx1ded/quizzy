import { Header } from "widgets/header"
import { Index } from "widgets/footer"
import { Hero } from "./Hero"
import { Examples } from "./Examples"
import { Levels } from "./Levels"
import { HowToStart } from "./HowToStart"
import { Invite } from "./Invite"

export function Main() {
  return (
    <div className="mt-4">
      <Header />
      <main>
        <Hero />
        <Examples />
        <Levels />
        <HowToStart />
        <Invite />
      </main>
      <Index />
    </div>
  )
}
