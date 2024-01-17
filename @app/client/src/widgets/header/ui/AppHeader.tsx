import { NavLink } from "react-router-dom"
import { Container } from "shared/ui/Container"
import { Logo } from "shared/ui/Logo"
import { Button } from "shared/ui/Button"
import { Person } from "shared/icons/Person"
import { Input } from "shared/ui/Input"

export function AppHeader() {
  return (
    <Container
      className="flex grow flex-wrap items-center justify-between after:mt-2 after:block after:h-px after:w-full after:bg-black/20"
      maxWidth={86}>
      <Logo as={NavLink} className="basis-36" size={2.5} to="/app" />
      <Input
        className="w-96"
        placeholder="Search for public quizzes"
        withMagnifier
      />
      <nav className="basis-36">
        <ul className="flex list-none items-center gap-x-6">
          <li>
            <Button
              as={NavLink}
              className="px-5"
              to="/app/create"
              variant="secondary">
              Create
            </Button>
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
