import { NavLink } from "react-router-dom"
import NotFoundIllustration from "assets/404-illustation.svg"
import { Subheading } from "../Typography"
import { Button } from "../Button"

export function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <img alt="404 error" className="max-w-sm" src={NotFoundIllustration} />
      <Subheading className="mb-4">Not Found!</Subheading>
      <Button as={NavLink} className="px-5 py-1.5" to="/app">
        Home
      </Button>
    </div>
  )
}
