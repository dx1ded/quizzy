import { ComponentPropsWithoutRef } from "react"
import { Input } from "shared/ui/Input"
import { Spinner } from "shared/ui/Spinner"

interface AuthInputProps<T> extends ComponentPropsWithoutRef<"input"> {
  /**
   * If true then a specific request will be sent on server to check if the
   * username is already taken
   */
  checkAvailability?: boolean
  /**
   *
   */
  loadingField?: T
}

export function AuthInput<T>({
  className,
  checkAvailability,
  loadingField,
  ...props
}: AuthInputProps<T>) {
  const inputClassName = `w-full !py-1.5 text-sm ${className || ""}`

  return (
    <>
      <Input
        {...props}
        autoComplete="off"
        className={inputClassName}
        {...(checkAvailability ? { "data-check": true } : {})}
      />
      {loadingField === props.id && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <Spinner size={1} />
        </div>
      )}
    </>
  )
}
