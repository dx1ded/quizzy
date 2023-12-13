import { PropsWithChildren } from "react"
import { PropsWithClassname } from "../../types"

export function Container({
  children,
  className,
}: PropsWithChildren<PropsWithClassname>) {
  const containerClassName = `max-w-[72rem] mx-auto px-5 ${className || ""}`
  return <div className={containerClassName}>{children}</div>
}
