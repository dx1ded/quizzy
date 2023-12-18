import { IconProps } from "../../lib/types"

export function Cross({ width, height, color, className }: IconProps) {
  return (
    <svg
      className={className}
      fill={color || "currentColor"}
      height={height ? `${height}rem` : "100%"}
      viewBox="0 0 14 14"
      width={width ? `${width}rem` : "100%"}
      xmlns="http://www.w3.org/2000/svg">
      <path d="M2.26002 0.894997L0.89502 2.26L5.66502 7L0.89502 11.74L2.26002 13.105L7.03002 8.365L11.8 13.105L13.15 11.74L8.39502 7L13.15 2.26L11.8 0.894997L7.03002 5.635L2.26002 0.894997Z" />
    </svg>
  )
}
