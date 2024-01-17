import { NavLink } from "react-router-dom"
import { Button } from "../Button"
import { Caption } from "../Typography"

export function Sidebar() {
  return (
    <nav className="flex min-h-[48rem] w-56 flex-col border-r border-gray pb-2 pr-3 pt-7">
      <ul className="list-none">
        <li className="[&:not(:last-child)]:mb-3">
          <Button
            as={NavLink}
            className="block pl-6 [&.active]:border-primary [&.active]:bg-primary [&.active]:text-white"
            size="lg"
            to="/app"
            variant="white">
            Home
          </Button>
        </li>
        <li className="[&:not(:last-child)]:mb-3">
          <Button
            as={NavLink}
            className="block pl-6 [&.active]:border-primary [&.active]:bg-primary [&.active]:text-white"
            size="lg"
            to="/app/discover"
            variant="white">
            Discover
          </Button>
        </li>
        <li className="[&:not(:last-child)]:mb-3">
          <Button
            as={NavLink}
            className="block pl-6 [&.active]:border-primary [&.active]:bg-primary [&.active]:text-white"
            size="lg"
            to="/app/library"
            variant="white">
            Library
          </Button>
        </li>
        <li className="[&:not(:last-child)]:mb-3">
          <Button
            as={NavLink}
            className="block pl-6 [&.active]:border-primary [&.active]:bg-primary [&.active]:text-white"
            size="lg"
            to="/app/reports"
            variant="white">
            Reports
          </Button>
        </li>
      </ul>
      <div className="mt-auto border-t border-gray pt-4 text-center">
        <Button
          as={NavLink}
          className="mb-2.5 block [&.active]:border-primary [&.active]:bg-primary [&.active]:text-white"
          size="lg"
          to="/app/about"
          variant="white">
          About
        </Button>
        <Caption>v0.1 beta</Caption>
      </div>
    </nav>
  )
}
