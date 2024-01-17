import { PropsWithChildren } from "react"
import { PropsWithClassname } from "../../lib"

export function Box({
  children,
  className,
}: PropsWithChildren<PropsWithClassname>) {
  const boxClassName = `rounded-md border border-gray px-4 pb-4 pt-3 shadow ${
    className || ""
  }`

  return <div className={boxClassName}>{children}</div>
}
