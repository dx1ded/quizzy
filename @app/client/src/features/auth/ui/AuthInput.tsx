import { ComponentPropsWithoutRef } from "react"
import { Input } from "shared/ui/Input"
import { Spinner } from "shared/ui/Spinner"

interface AuthInputProps<T> extends ComponentPropsWithoutRef<"input"> {
  /**
   * Field which is loading. Used only for inputs that need to be checked by
   * availability
   */
  loadingField?: T
}

export function AuthInput<T>({
  className,
  loadingField,
  ...props
}: AuthInputProps<T>) {
  const inputClassName = `w-full !py-1.5 text-sm sm:text-xs ${className || ""}`

  return (
    <>
      <Input {...props} autoComplete="off" className={inputClassName} />
      {loadingField === props.id && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <Spinner size={1} />
        </div>
      )}
    </>
  )
}
