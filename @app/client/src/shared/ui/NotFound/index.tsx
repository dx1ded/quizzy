import { NavLink } from "react-router-dom"
import { Subheading } from "../Typography"
import { Button } from "../Button"

interface NotFoundProps {
  to?: string
}

export function NotFound({ to = "/app" }: NotFoundProps) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <img
        alt="404 error"
        className="max-w-sm"
        src="https://firebasestorage.googleapis.com/v0/b/quizzy-222b7.appspot.com/o/404-illustation.svg?alt=media"
      />
      <Subheading className="mb-4">Not Found!</Subheading>
      <Button as={NavLink} className="px-5 py-1.5" to={to}>
        Home
      </Button>
    </div>
  )
}
