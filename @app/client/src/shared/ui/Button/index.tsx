import {
  PropsWithChildren,
  ButtonHTMLAttributes,
  ElementType,
  ComponentPropsWithoutRef,
} from "react"

const variants = {
  primary: "bg-primary text-white",
  secondary: "bg-secondary text-white",
  third: "bg-white text-secondary border border-secondary",
  white: "bg-white text-black border border-gray",
}

type ButtonVariants = keyof typeof variants

const sizes = {
  // 16 px
  lg: "text-base xl:text-sm",
  // 14 px
  md: "text-sm",
  // 12 px
  sm: "text-xs",
  // 10 px
  xs: "text-[0.625rem]",
}

type ButtonSizes = keyof typeof sizes

interface ButtonProps<T>
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  /**
   * Button variant (primary | secondary | white)
   */
  variant?: ButtonVariants
  /**
   * Button size (lg | md | sm | xs)
   */
  size?: ButtonSizes
  /**
   * Component polymorphism
   */
  as?: T
}

export function Button<T extends ElementType = "button">({
  type = "button",
  variant = "primary",
  size = "lg",
  children,
  as,
  ...props
}: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) {
  const className = `${variants[variant]} ${
    sizes[size]
  } rounded font-semibold px-2 py-1 disabled:opacity-75 ${
    props.className || ""
  }`
  const Component = as || "button"

  return (
    // Used because there's an issue that type should be always static (not dynamic)
    // However it's not our case and that's the reason we suppress the error
    <Component
      // eslint-disable-next-line react/button-has-type
      type={type}
      {...props}
      className={className}>
      {children}
    </Component>
  )
}
