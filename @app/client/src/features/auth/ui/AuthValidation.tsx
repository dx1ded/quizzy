import { FieldError } from "react-hook-form"
import { Tick } from "shared/icons/Tick"
import { Cross } from "shared/icons/Cross"

interface AuthValidationProps {
  error: FieldError | undefined
  initialErrors: string[]
}

export function AuthValidation({ error, initialErrors }: AuthValidationProps) {
  if (!error) return

  return (
    <div className="v:translate-x-0 v:translate-y-0 v:mt-4 v:before:hidden v:drop-shadow-none v:p-0 v:static absolute -right-4 top-1/2 -translate-y-1/2 translate-x-full rounded bg-white py-2 pl-2.5 pr-4 drop-shadow before:absolute before:left-0 before:top-1/2 before:-translate-x-full before:-translate-y-1/2 before:border-8 before:border-solid before:border-transparent before:border-r-white">
      <ul>
        {initialErrors.map((initialError, i) =>
          error.message === initialError ||
          Object.values(error.types?.invalid_string || []).includes(
            initialError
          ) ||
          ["custom", "too_big"].includes(error.type) ? (
            <li
              key={i}
              className="flex animate-appear items-center gap-1.5 text-xs [&:not(:last-child)]:mb-2">
              <span className="flex h-4 w-4 items-center justify-center rounded-full border border-current text-[#FF2D00]">
                <Cross width={0.5} />
              </span>
              {["custom", "too_big"].includes(error.type)
                ? error.message
                : initialError}
            </li>
          ) : (
            <li
              key={i}
              className="flex animate-appear items-center gap-1.5 text-xs [&:not(:last-child)]:mb-2">
              <span className="flex h-4 w-4 items-center justify-center rounded-full border border-current text-[#00D03F]">
                <Tick width={0.8} />
              </span>
              {initialError}
            </li>
          )
        )}
      </ul>
    </div>
  )
}
