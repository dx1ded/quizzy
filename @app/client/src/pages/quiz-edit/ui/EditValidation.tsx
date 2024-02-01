import { FieldError } from "react-hook-form"
import { Cross } from "shared/icons/Cross"
import { Caption } from "shared/ui/Typography"

interface ValidationProps {
  error: FieldError | undefined
}

export function EditValidation({ error }: ValidationProps) {
  if (!error) return

  return (
    <div className="absolute z-50 flex translate-y-2.5 items-center gap-2 rounded bg-white py-2 pl-2.5 pr-4 drop-shadow before:absolute before:left-2 before:top-0 before:-translate-y-full before:border-8 before:border-solid before:border-transparent before:border-b-white">
      <span className="flex h-4 w-4 items-center justify-center rounded-full border border-current text-[#FF2D00]">
        <Cross width={0.5} />
      </span>
      <Caption>{error.message}</Caption>
    </div>
  )
}
