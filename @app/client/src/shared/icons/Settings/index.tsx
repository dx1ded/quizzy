import { IconProps } from "../../lib"

export function Settings({ width, height, color, className }: IconProps) {
  return (
    <svg
      className={className}
      fill={color || "currentColor"}
      height={height ? `${height}rem` : "100%"}
      viewBox="0 0 22 20"
      width={width ? `${width}rem` : "100%"}
      xmlns="http://www.w3.org/2000/svg">
      <path d="M8.24995 20L7.84995 16.8C7.63328 16.7167 7.42912 16.6167 7.23745 16.5C7.04578 16.3833 6.85828 16.2583 6.67495 16.125L3.69995 17.375L0.949951 12.625L3.52495 10.675C3.50828 10.5583 3.49995 10.4458 3.49995 10.3375V9.6625C3.49995 9.55417 3.50828 9.44167 3.52495 9.325L0.949951 7.375L3.69995 2.625L6.67495 3.875C6.85828 3.74167 7.04995 3.61667 7.24995 3.5C7.44995 3.38333 7.64995 3.28333 7.84995 3.2L8.24995 0H13.75L14.15 3.2C14.3666 3.28333 14.5708 3.38333 14.7625 3.5C14.9541 3.61667 15.1416 3.74167 15.325 3.875L18.3 2.625L21.05 7.375L18.475 9.325C18.4916 9.44167 18.5 9.55417 18.5 9.6625V10.3375C18.5 10.4458 18.4833 10.5583 18.45 10.675L21.025 12.625L18.275 17.375L15.325 16.125C15.1416 16.2583 14.95 16.3833 14.75 16.5C14.55 16.6167 14.35 16.7167 14.15 16.8L13.75 20H8.24995ZM9.99995 18H11.975L12.325 15.35C12.8416 15.2167 13.3208 15.0208 13.7625 14.7625C14.2041 14.5042 14.6083 14.1917 14.975 13.825L17.45 14.85L18.425 13.15L16.275 11.525C16.3583 11.2917 16.4166 11.0458 16.45 10.7875C16.4833 10.5292 16.5 10.2667 16.5 10C16.5 9.73333 16.4833 9.47083 16.45 9.2125C16.4166 8.95417 16.3583 8.70833 16.275 8.475L18.425 6.85L17.45 5.15L14.975 6.2C14.6083 5.81667 14.2041 5.49583 13.7625 5.2375C13.3208 4.97917 12.8416 4.78333 12.325 4.65L12 2H10.025L9.67495 4.65C9.15828 4.78333 8.67912 4.97917 8.23745 5.2375C7.79578 5.49583 7.39162 5.80833 7.02495 6.175L4.54995 5.15L3.57495 6.85L5.72495 8.45C5.64162 8.7 5.58328 8.95 5.54995 9.2C5.51662 9.45 5.49995 9.71667 5.49995 10C5.49995 10.2667 5.51662 10.525 5.54995 10.775C5.58328 11.025 5.64162 11.275 5.72495 11.525L3.57495 13.15L4.54995 14.85L7.02495 13.8C7.39162 14.1833 7.79578 14.5042 8.23745 14.7625C8.67912 15.0208 9.15828 15.2167 9.67495 15.35L9.99995 18ZM11.05 13.5C12.0166 13.5 12.8416 13.1583 13.525 12.475C14.2083 11.7917 14.55 10.9667 14.55 10C14.55 9.03333 14.2083 8.20833 13.525 7.525C12.8416 6.84167 12.0166 6.5 11.05 6.5C10.0666 6.5 9.23745 6.84167 8.56245 7.525C7.88745 8.20833 7.54995 9.03333 7.54995 10C7.54995 10.9667 7.88745 11.7917 8.56245 12.475C9.23745 13.1583 10.0666 13.5 11.05 13.5Z" />
    </svg>
  )
}