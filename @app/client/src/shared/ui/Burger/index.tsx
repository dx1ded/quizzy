import { useState } from "react"
import { createPortal } from "react-dom"
import { NavLink } from "react-router-dom"
import { Button } from "../Button"

export function Burger() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        className="hidden h-4 w-6 flex-col justify-between md:flex"
        type="button"
        onClick={() => setOpen(true)}>
        <span className="h-0.5 w-full bg-black" aria-hidden />
        <span className="h-0.5 w-full bg-black" aria-hidden />
        <span className="h-0.5 w-full bg-black" aria-hidden />
      </button>
      {createPortal(
        <div
          className={`${
            open ? "visible opacity-100" : "invisible opacity-0"
          } transition-all`}>
          <div
            className="fixed left-0 top-0 z-40 h-full w-full bg-black opacity-50"
            onClick={() => setOpen(false)}
          />
          <div
            className={`fixed left-0 top-0 z-50 h-full w-56 bg-white px-3 py-1 transition-transform ${
              open ? "" : "-translate-x-full"
            }`}>
            <button
              className="relative mb-4 h-5 w-5 rotate-45"
              type="button"
              onClick={() => setOpen(false)}>
              <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-black" />
              <span className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-black" />
            </button>
            <nav>
              <ul className="flex list-none flex-col gap-2">
                <li>
                  <Button
                    as={NavLink}
                    className="block pl-4 [&.active]:border-primary [&.active]:bg-primary [&.active]:text-white"
                    size="sm"
                    to="/app"
                    variant="white"
                    end>
                    Home
                  </Button>
                </li>
                <li>
                  <Button
                    as={NavLink}
                    className="block pl-4 [&.active]:border-primary [&.active]:bg-primary [&.active]:text-white"
                    size="sm"
                    to="/app/discover"
                    variant="white"
                    end>
                    Discover
                  </Button>
                </li>
                <li>
                  <Button
                    as={NavLink}
                    className="block pl-4 [&.active]:border-primary [&.active]:bg-primary [&.active]:text-white"
                    size="sm"
                    to="/app/library"
                    variant="white"
                    end>
                    Library
                  </Button>
                </li>
                <li>
                  <Button
                    as={NavLink}
                    className="block pl-4 [&.active]:border-primary [&.active]:bg-primary [&.active]:text-white"
                    size="sm"
                    to="/app/records"
                    variant="white"
                    end>
                    Records
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
