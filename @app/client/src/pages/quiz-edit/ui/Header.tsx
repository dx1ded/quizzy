import { NavLink } from "react-router-dom"
import { Logo } from "shared/ui/Logo"
import { Input } from "shared/ui/Input"
import { AddPhoto } from "shared/icons/AddPhoto"
import { Button } from "shared/ui/Button"

export function Header() {
  return (
    <header className="flex items-center bg-white px-6 py-2 shadow">
      <Logo as={NavLink} className="mr-6" size={2.75} to="/app" />
      <Input className="mr-4 w-60" placeholder="Enter quiz name..." />
      <button type="button">
        <AddPhoto width={1.25} />
      </button>
      <Button className="ml-auto mr-4 px-8" variant="white">
        Delete
      </Button>
      <Button className="px-8" variant="secondary">
        Create
      </Button>
    </header>
  )
}
