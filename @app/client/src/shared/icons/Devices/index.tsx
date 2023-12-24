import { IconProps } from "../../lib"

export function Devices({ width, height, color, className }: IconProps) {
  return (
    <svg
      className={className}
      fill={color || "currentColor"}
      height={height ? `${height}rem` : "100%"}
      viewBox="0 0 20 16"
      width={width ? `${width}rem` : "100%"}
      xmlns="http://www.w3.org/2000/svg">
      <path d="M0 16V13H2V2C2 1.45 2.19583 0.979167 2.5875 0.5875C2.97917 0.195833 3.45 0 4 0H19V2H4V13H10V16H0ZM13 16C12.7167 16 12.4792 15.9042 12.2875 15.7125C12.0958 15.5208 12 15.2833 12 15V5C12 4.71667 12.0958 4.47917 12.2875 4.2875C12.4792 4.09583 12.7167 4 13 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5V15C20 15.2833 19.9042 15.5208 19.7125 15.7125C19.5208 15.9042 19.2833 16 19 16H13ZM14 13H18V6H14V13Z" />
    </svg>
  )
}
