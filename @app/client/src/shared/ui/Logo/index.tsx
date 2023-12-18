import { ComponentPropsWithoutRef, ElementType } from "react"
import { PropsWithClassname } from "../../lib/types"

interface LogoProps<T> extends PropsWithClassname {
  /**
   * Font size in rem
   */
  size?: number
  /**
   * Text color
   */
  color?: string
  /**
   * Component polymorphism
   */
  as?: T
}

export function Logo<T extends ElementType = "h2">({
  size = 1.5,
  color = "#273ED4",
  as,
  className,
  ...props
}: LogoProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof LogoProps<T>>) {
  const logoClassName = `font-lobster text-bold ${className || ""}`
  const Component = as || "h2"

  return (
    <Component
      className={logoClassName}
      style={{ fontSize: `${size}rem`, color }}
      {...props}>
      Quizzy!
    </Component>
  )
}

export function LogoBlack<T extends ElementType = "h2">({
  size = 1.5,
  as,
  className,
  ...props
}: Exclude<LogoProps<T>, "color"> &
  Omit<ComponentPropsWithoutRef<T>, keyof LogoProps<T>>) {
  const logoClassName = `font-lobster text-bold text-black ${className || ""}`
  const Component = as || "h2"

  return (
    <Component
      className={logoClassName}
      style={{ fontSize: `${size}rem` }}
      {...props}>
      Quizzy!
    </Component>
  )
}
