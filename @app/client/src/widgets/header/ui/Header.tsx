import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { AccountState } from "entities/account"
import type { AppStore } from "app/model"
import { Person } from "shared/icons/Person"
import { Container } from "shared/ui/Container"
import { Logo } from "shared/ui/Logo"
import { Button } from "shared/ui/Button"

export function Header() {
  const { token } = useSelector<AppStore, AccountState>(
    (state) => state.account
  )
  const { data } = useQuery({
    queryKey: ["authToken"],
    queryFn: () => {
      if (!token) return Promise.reject(new Error("No token"))

      return fetch("/api/auth/check-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((json) => json)
    },
  })

  return (
    <Container className="flex grow flex-wrap items-center justify-between after:mt-2 after:block after:h-px after:w-full after:bg-black/20">
      <Logo as={NavLink} className="xl:!text-4xl" size={3} to="/" />
      <nav>
        <ul className="flex list-none items-center gap-x-6 md:gap-x-5 sm:gap-x-4">
          <li>
            <NavLink
              className="text-sm font-bold text-black no-underline"
              to="/join">
              Play
            </NavLink>
          </li>
          <li>
            {data ? (
              <NavLink
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary md:h-7 md:w-7"
                to="/app">
                <Person className="md:w-3" color="#fff" width={0.8} />
              </NavLink>
            ) : (
              <Button
                as="a"
                className="px-7 py-2 xl:px-5 sm:px-4 sm:py-1.5"
                href="/auth">
                Sign up
              </Button>
            )}
          </li>
        </ul>
      </nav>
    </Container>
  )
}
