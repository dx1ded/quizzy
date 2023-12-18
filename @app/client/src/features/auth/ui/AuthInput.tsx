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
      className="w-full text-sm [&:not(:last-child)]:mb-5"
    />
  )
})
