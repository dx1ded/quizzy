import { IconProps } from "../../lib"

export function Star({ width, height, color, className }: IconProps) {
  return (
    <svg
      className={className}
      fill={color || "currentColor"}
      height={height ? `${height}rem` : "100%"}
      viewBox="0 0 18 16"
      width={width ? `${width}rem` : "100%"}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 1.99804L10.406 6.08481L10.5569 6.52336H11.0206L15.4634 6.52336L11.9017 8.96733L11.4939 9.24713L11.6548 9.71475L13.0353 13.7273L9.36776 11.2108L9 10.9584L8.63224 11.2108L4.96475 13.7273L6.3452 9.71475L6.50608 9.24713L6.09832 8.96733L2.5366 6.52336L6.97937 6.52336H7.44314L7.59402 6.08481L9 1.99804Z"
        stroke="#FDB800"
        strokeWidth="1.5"
      />
    </svg>
  )
}
