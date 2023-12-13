import { NavLink } from "react-router-dom"
import { Container } from "shared/ui/Container"
import { Logo } from "shared/ui/Logo"
import { Button } from "shared/ui/Button"

export function Header() {
  return (
    <Container className="flex grow flex-wrap items-center justify-between after:mt-2 after:block after:h-px after:w-full after:bg-black/20">
      <Logo as={NavLink} size={3} to="/" />
      <nav>
        <ul className="flex list-none items-center gap-x-6">
          <li>
            <NavLink
              className="text-sm font-bold text-black no-underline"
              to="/play">
              Play
            </NavLink>
          </li>
          <li>
            <Button as={NavLink} className="px-7 py-2" to="/auth">
              Sign up
            </Button>
          </li>
        </ul>
      </nav>
    </Container>
  )
}
