import { PropsWithChildren } from "react"
import { PropsWithClassname } from "../../lib"

interface ContainerProps extends PropsWithClassname {
  /**
   * Max width in rem
   */
  maxWidth?: number
}

export function Container({
  children,
  className,
  maxWidth = 72,
}: PropsWithChildren<ContainerProps>) {
  const containerClassName = `mx-auto px-5 ${className || ""} md:px-3.5`
  return (
    <div className={containerClassName} style={{ maxWidth: `${maxWidth}rem` }}>
      {children}
    </div>
  )
}
