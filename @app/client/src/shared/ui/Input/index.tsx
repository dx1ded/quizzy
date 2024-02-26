import { ComponentPropsWithoutRef, forwardRef } from "react"
import { Magnifier } from "../../icons/Magnifier"
import { PropsWithClassname } from "../../lib"

type InputVariants = "primary" | "secondary"

const variants: Record<InputVariants, string> = {
  primary: "text-black font-normal border border-gray",
  secondary: "text-secondary border-2 border-current",
}

interface InputProps
  extends PropsWithClassname,
    ComponentPropsWithoutRef<"input"> {
  /**
   * Input variant (primary | secondary)
   */
  variant?: InputVariants
  /**
   * Determines if there's a magnifier icon before the placeholder
   */
  withMagnifier?: boolean
  magnifierClassName?: string
  magnifierWidth?: number
  magnifierHeight?: number
  /**
   * Determines if there's a placeholder in the center
   */
  isCentered?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    variant = "primary",
    withMagnifier = false,
    isCentered = false,
    magnifierWidth = 1,
    magnifierHeight = 1,
    magnifierClassName,
    ...attrs
  }: InputProps,
  ref
) {
  const className = `${
    variants[variant]
  } rounded text-base bg-white py-1 px-2.5 outline-none placeholder:text-current lg:text-sm ${
    isCentered ? "text-center" : ""
  } ${attrs.className || ""}`

  if (withMagnifier) {
    return (
      <div className="relative inline-block">
        <Magnifier
          className={`absolute left-3.5 top-1/2 translate-y-[-50%] lg:left-3 lg:w-3.5 ${
            magnifierClassName || ""
          }`}
          color="#FFB800"
          height={magnifierHeight}
          width={magnifierWidth}
        />
        <input ref={ref} {...attrs} className={`${className} pl-10 lg:pl-8`} />
      </div>
    )
  }

  return <input ref={ref} {...attrs} className={className} />
})
