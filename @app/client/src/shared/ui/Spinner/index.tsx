import { PropsWithClassname } from "../../lib"
import "./index.css"

interface SpinnerProps {
  /**
   * Size in rem
   */
  size?: number
}

export function Spinner({
  size = 2,
  className,
}: SpinnerProps & PropsWithClassname) {
  return (
    <div
      className={`loader ${className || ""}`}
      style={{ width: `${size}rem` }}
    />
  )
}
