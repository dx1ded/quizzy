import { NavLink } from "react-router-dom"
import { Button } from "../Button"
import { Caption } from "../Typography"

export function Sidebar() {
  return (
    <nav className="sticky top-0 flex h-[48rem] w-56 flex-col rounded pr-3 pt-7">
      <ul className="list-none">
        <li className="[&:not(:last-child)]:mb-2.5">
          <Button
            as={NavLink}
            className="block pl-4 [&.active]:border-primary [&.active]:bg-primary [&.active]:text-white"
            size="md"
            to="/app"
            variant="white"
            end>
            Home
          </Button>
        </li>
        <li className="[&:not(:last-child)]:mb-2.5">
          <Button
            as={NavLink}
            className="block pl-4 [&.active]:border-primary [&.active]:bg-primary [&.active]:text-white"
            size="md"
            to="/app/discover"
            variant="white"
            end>
            Discover
          </Button>
        </li>
        <li className="[&:not(:last-child)]:mb-2.5">
          <Button
            as={NavLink}
            className="block pl-4 [&.active]:border-primary [&.active]:bg-primary [&.active]:text-white"
            size="md"
            to="/app/library"
            variant="white"
            end>
            Library
          </Button>
        </li>
        <li className="[&:not(:last-child)]:mb-2.5">
          <Button
            as={NavLink}
            className="block pl-4 [&.active]:border-primary [&.active]:bg-primary [&.active]:text-white"
            size="md"
            to="/app/records"
            variant="white"
            end>
            Records
          </Button>
        </li>
      </ul>
      <div className="mt-auto border-t border-gray pt-4 text-center">
        <Button
          as={NavLink}
          className="mb-2.5 block [&.active]:border-primary [&.active]:bg-primary [&.active]:text-white"
          size="md"
          to="/app/about"
          variant="white"
          end>
          About
        </Button>
        <Caption>v0.1 beta</Caption>
      </div>
    </nav>
  )
}
