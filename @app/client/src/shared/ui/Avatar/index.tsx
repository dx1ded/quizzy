import { AvatarType } from "@quizzy/common"

interface AvatarProps {
  name: AvatarType
  className?: string
  width?: string
  height?: string
}

export function Avatar({
  name,
  className,
  width = "5rem",
  height = "5rem",
}: AvatarProps) {
  return (
    <img
      alt={name}
      className={className}
      src={`https://firebasestorage.googleapis.com/v0/b/quizzy-222b7.appspot.com/o/avatars%2F${name}.svg?alt=media`}
      style={{ width, height }}
    />
  )
}
