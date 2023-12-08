import { PropsWithChildren, ButtonHTMLAttributes } from "react"

type ButtonVariants = "primary" | "secondary" | "white"

const variants: Record<ButtonVariants, string> = {
  primary: "bg-primary text-white",
  secondary: "bg-secondary text-white",
  white: "bg-white text-black border border-gray",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants
}

export function Button({
  type = "button",
  variant = "primary",
  children,
  ...attrs
}: PropsWithChildren<ButtonProps>) {
  const className = `${variants[variant]} rounded px-2 py-1 ${attrs.className}`

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
