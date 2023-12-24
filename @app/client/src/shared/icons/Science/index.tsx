import { IconProps } from "../../lib"

export function Science({ width, height, color, className }: IconProps) {
  return (
    <svg
      className={className}
      fill={color || "currentColor"}
      height={height ? `${height}rem` : "100%"}
      viewBox="0 0 20 18"
      width={width ? `${width}rem` : "100%"}
      xmlns="http://www.w3.org/2000/svg">
      <path d="M3 18C2.15 18 1.54583 17.6208 1.1875 16.8625C0.829168 16.1042 0.916668 15.4 1.45 14.75L7 8V2H6C5.71667 2 5.47917 1.90417 5.2875 1.7125C5.09583 1.52083 5 1.28333 5 1C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H14C14.2833 0 14.5208 0.0958333 14.7125 0.2875C14.9042 0.479167 15 0.716667 15 1C15 1.28333 14.9042 1.52083 14.7125 1.7125C14.5208 1.90417 14.2833 2 14 2H13V8L18.55 14.75C19.0833 15.4 19.1708 16.1042 18.8125 16.8625C18.4542 17.6208 17.85 18 17 18H3ZM3 16H17L11 8.7V2H9V8.7L3 16Z" />
    </svg>
  )
}
