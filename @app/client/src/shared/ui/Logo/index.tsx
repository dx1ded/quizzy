import { PropsWithClassname } from "../../types"

interface LogoProps extends PropsWithClassname {
  /**
   * Font size in rem
   */
  size?: number
  /**
   * Text color
   */
  color?: string
}

export function Logo({ size = 1.5, color = "#273ED4", className }: LogoProps) {
  const logoClassName = `font-lobster text-bold ${className || ""}`
  return (
    <h2 className={logoClassName} style={{ fontSize: `${size}rem`, color }}>
      Quizzy!
    </h2>
  )
}

export function LogoBlack({
  size = 1.5,
  className,
}: Exclude<LogoProps, "color">) {
  const logoClassName = `font-lobster text-bold text-black ${className || ""}`
  return (
    <h2 className={logoClassName} style={{ fontSize: `${size}rem` }}>
      Quizzy!
    </h2>
  )
}
