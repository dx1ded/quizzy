import { PropsWithChildren } from "react"
import { PropsWithClassname } from "../../lib"

export function Box({
  children,
  className,
}: PropsWithChildren<PropsWithClassname>) {
  const boxClassName = `rounded-md border border-gray px-5 py-4 shadow md:px-4 sm:px-3 sm:py-3 ${
    className || ""
  }`

  return <div className={boxClassName}>{children}</div>
}
