import { ComponentPropsWithoutRef, forwardRef } from "react"
import { Input } from "shared/ui/Input"

export const AuthInput = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input">
>(function AuthInput(props: ComponentPropsWithoutRef<"input">, ref) {
  return (
    <Input
      ref={ref}
      {...props}
      className="w-full !py-1.5 text-sm [&:not(:last-of-type)]:mb-5"
    />
  )
})
