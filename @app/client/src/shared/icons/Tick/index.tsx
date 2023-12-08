import { PropsWithClassname } from "../../types"

export function Tick({ className }: PropsWithClassname) {
  return (
    <svg
      className={className}
      fill="none"
      height="100%"
      viewBox="0 0 12 12"
      width="100%"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.77499 9L1.92499 6.15L2.63749 5.4375L4.77499 7.575L9.36249 2.9875L10.075 3.7L4.77499 9Z"
        fill="currentColor"
      />
    </svg>
  )
}
