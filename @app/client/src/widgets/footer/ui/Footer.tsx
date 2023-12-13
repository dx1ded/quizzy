import { NavLink } from "react-router-dom"
import { Container } from "shared/ui/Container"
import { Logo } from "shared/ui/Logo"

export function Footer() {
  return (
    <footer className="bg-primary py-5">
      <Container className="flex items-center justify-between">
        <Logo as={NavLink} color="#fff" size={2} to="/" />
        <nav>
          <ul className="flex list-none gap-x-11">
            <li>
              <NavLink
                className="relative text-base font-semibold text-white after:absolute after:bottom-[-4px] after:block after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-secondary after:transition-transform after:duration-100 after:ease-in-out hover:after:scale-x-100"
                to="/">
                Main
              </NavLink>
            </li>
            <li>
              <NavLink
                className="relative text-base font-semibold text-white after:absolute after:bottom-[-4px] after:block after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-secondary after:transition-transform after:duration-100 after:ease-in-out hover:after:scale-x-100"
                to="/play">
                Play
              </NavLink>
            </li>
            <li>
              <NavLink
                className="relative text-base font-semibold text-white after:absolute after:bottom-[-4px] after:block after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-secondary after:transition-transform after:duration-100 after:ease-in-out hover:after:scale-x-100"
                to="/auth">
                Sign up
              </NavLink>
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  )
}
