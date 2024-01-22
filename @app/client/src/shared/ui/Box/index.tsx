import { PropsWithChildren } from "react"
import { PropsWithClassname } from "../../lib"

export function Box({
  children,
  className,
}: PropsWithChildren<PropsWithClassname>) {
  const boxClassName = `rounded-md border border-gray px-5 py-4 shadow ${
    className || ""
  }`

  return <div className={boxClassName}>{children}</div>
}
