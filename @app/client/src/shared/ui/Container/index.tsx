import { PropsWithChildren } from "react"
import { PropsWithClassname } from "../../lib/types"

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
  const containerClassName = `mx-auto px-5 ${className || ""}`
  return (
    <div className={containerClassName} style={{ maxWidth: `${maxWidth}rem` }}>
      {children}
    </div>
  )
}
