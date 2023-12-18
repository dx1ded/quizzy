import { ComponentPropsWithoutRef, forwardRef } from "react"

export const AuthLabel = forwardRef<
  HTMLLabelElement,
  ComponentPropsWithoutRef<"label">
>(function AuthLabel(
  { children, ...props }: ComponentPropsWithoutRef<"label">,
  ref
) {
  return (
    <label
      ref={ref}
      htmlFor={props.htmlFor}
      {...props}
      className="mb-2 inline-block text-sm font-semibold leading-5">
      {children}
    </label>
  )
})
