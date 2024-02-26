import { Menu, MenuItem } from "@mui/material"
import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import { logout } from "entities/account"
import { HeaderSearch } from "features/search-quiz"
import { CreateQuiz } from "features/create-quiz"
import { Logout } from "shared/icons/Logout"
import { Container } from "shared/ui/Container"
import { Burger } from "shared/ui/Burger"
import { Logo } from "shared/ui/Logo"
import { Person } from "shared/icons/Person"

export function AppHeader() {
  const dispatch = useDispatch()
  const anchorRef = useRef<HTMLButtonElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <Container
      className="flex grow flex-wrap items-center justify-between after:mt-2 after:block after:h-px after:w-full after:bg-black/20"
      maxWidth={86}>
      <div className="flex basis-36 items-center gap-3 lg:basis-28">
        <Burger />
        <Logo as={NavLink} className="lg:!text-3xl" size={2.5} to="/app" />
      </div>
      <HeaderSearch />
      <nav className="flex basis-36 justify-end lg:basis-28">
        <ul className="flex list-none items-center gap-x-6 lg:gap-x-4">
          <li>
            <CreateQuiz>Create</CreateQuiz>
          </li>
          <li className="flex items-center">
            <button
              ref={anchorRef}
              type="button"
              onClick={() => setMenuOpen(true)}>
              <Person className="lg:w-4" width={1.1} />
            </button>
            <Menu
              anchorEl={anchorRef.current}
              open={menuOpen}
              onClose={() => setMenuOpen(false)}>
              <MenuItem onClick={() => dispatch(logout())}>
                <div className="flex items-center gap-2">
                  <Logout className="md:w-3" color="#FF0000" width={0.8} />
                  <span className="text-sm text-red-600 md:text-xs">
                    Sign out
                  </span>
                </div>
              </MenuItem>
            </Menu>
          </li>
        </ul>
      </nav>
    </Container>
  )
}
