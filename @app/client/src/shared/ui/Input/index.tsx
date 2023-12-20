import {
  InputHTMLAttributes,
  forwardRef,
  ComponentPropsWithoutRef,
} from "react"
import { PropsWithClassname } from "../../lib/types"
import { Magnifier } from "../../icons/Magnifier"

type InputVariants = "primary" | "secondary"

const variants: Record<InputVariants, string> = {
  primary: "text-black font-normal border border-gray",
  secondary: "text-secondary border-2 border-current",
}

interface InputProps
  extends PropsWithClassname,
    InputHTMLAttributes<HTMLInputElement> {
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

export const Input = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input">
>(function Input(
  {
    variant = "primary",
    withMagnifier = false,
    isCentered = false,
    magnifierWidth,
    magnifierHeight,
    magnifierClassName,
    ...attrs
  }: InputProps,
  ref
) {
  const className = `${
    variants[variant]
  } rounded text-base bg-white py-1 px-2.5 outline-none placeholder:text-current ${
    isCentered ? "text-center" : ""
  } ${attrs.className || ""}`

  if (withMagnifier) {
    return (
      <div className="relative">
        <Magnifier
          className={`absolute left-3.5 top-1/2 translate-y-[-50%] ${
            magnifierClassName || ""
          }`}
          color="#FFB800"
          height={magnifierHeight || 1}
          width={magnifierWidth || 1}
        />
        <input {...attrs} ref={ref} className={`${className} pl-10`} />
      </div>
    )
  }

  return <input {...attrs} ref={ref} className={className} />
})
