import { NavLink } from "react-router-dom"
import { Button } from "../Button"
import { Caption } from "../Typography"

export function Sidebar() {
  return (
    <nav className="sticky top-0 flex h-[calc(100vh-6rem)] min-h-[20rem] w-56 flex-col rounded pt-7 lg:w-44 md:hidden">
      <ul className="list-none">
        <li className="[&:not(:last-child)]:mb-2.5">
          <Button
            as={NavLink}
            className="block pl-4 text-gray-600 [&.active]:border-primary [&.active]:bg-primary [&.active]:text-white"
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
            className="block pl-4 text-gray-700 [&.active]:border-primary [&.active]:bg-primary [&.active]:text-white"
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
            className="block pl-4 text-gray-700 [&.active]:border-primary [&.active]:bg-primary [&.active]:text-white"
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
            className="block pl-4 text-gray-700 [&.active]:border-primary [&.active]:bg-primary [&.active]:text-white"
            size="md"
            to="/app/records"
            variant="white"
            end>
            Records
          </Button>
        </li>
      </ul>
      <div className="border-gray mt-auto border-t pt-4 text-center">
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
