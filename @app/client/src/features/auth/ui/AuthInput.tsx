import { ComponentPropsWithoutRef, forwardRef } from "react"
import { Input } from "shared/ui/Input"

export const AuthInput = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input">
>(function AuthInput(props: ComponentPropsWithoutRef<"input">, ref) {
  const className = `w-full !py-1.5 text-sm ${
    props.className ? props.className : ""
  }`

  return <Input ref={ref} {...props} autoComplete="off" className={className} />

  // return (
  //   <div className="relative [&:not(:last-of-type)]:mb-5">
  //     <Input ref={ref} {...props} autoComplete="off" className={className} />
  //     <AuthValidation />
  //   </div>
  // )
})
