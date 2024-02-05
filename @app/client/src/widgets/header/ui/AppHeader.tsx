import { NavLink } from "react-router-dom"
import { HeaderSearch } from "features/search-quiz"
import { CreateQuiz } from "features/create-quiz"
import { Container } from "shared/ui/Container"
import { Logo } from "shared/ui/Logo"
import { Person } from "shared/icons/Person"

export function AppHeader() {
  return (
    <Container
      className="flex grow flex-wrap items-center justify-between after:mt-2 after:block after:h-px after:w-full after:bg-black/20"
      maxWidth={86}>
      <Logo as={NavLink} className="basis-36" size={2.5} to="/app" />
      <HeaderSearch />
      <nav className="basis-36">
        <ul className="flex list-none items-center gap-x-6">
          <li>
            <CreateQuiz>Create</CreateQuiz>
          </li>
          <li>
            <NavLink to="/app/account">
              <Person width={1.2} />
            </NavLink>
          </li>
        </ul>
      </nav>
    </Container>
  )
}
