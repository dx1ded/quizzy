import { PropsWithChildren, ButtonHTMLAttributes } from "react"

type ButtonVariants = "primary" | "secondary" | "white"

const variants: Record<ButtonVariants, string> = {
  primary: "bg-primary text-white",
  secondary: "bg-secondary text-white",
  white: "bg-white text-black border border-gray",
}

type ButtonSizes = "lg" | "md" | "sm" | "xs"

const sizes: Record<ButtonSizes, string> = {
  // 16 px
  lg: "text-base",
  // 14 px
  md: "text-sm",
  // 12 px
  sm: "text-xs",
  // 10 px
  xs: "text-[0.625rem]",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant (primary | secondary | white)
   */
  variant?: ButtonVariants
  /**
   * Button size (lg | md | sm | xs)
   */
  size?: ButtonSizes
}

export function Button({
  type = "button",
  variant = "primary",
  size = "lg",
  children,
  ...attrs
}: PropsWithChildren<ButtonProps>) {
  const className = `${variants[variant]} ${
    sizes[size]
  } rounded font-semibold px-2 py-1 ${attrs.className || ""}`

  return (
    // Used because there's an issue that type should be always static (not dynamic)
    // However it's not our case and that's the reason we suppress the error
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      {...attrs}
      className={className}>
      {children}
    </button>
  )
}
