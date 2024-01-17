import { PropsWithClassname } from "../../lib"
import { Text } from "../Typography"

interface QuizzyImageProps extends PropsWithClassname {
  /**
   * Width
   */
  width?: string
  /**
   * Height
   */
  height?: string
  /**
   * Font size in rem
   */
  size?: number
}

export function QuizzyImage({
  className,
  width = "6rem",
  height = "3.5rem",
  size = 1,
}: QuizzyImageProps) {
  const quizzyImageClassName = `mr-2.5 flex items-center justify-center bg-primary ${
    className || ""
  }`

  return (
    <div className={quizzyImageClassName} style={{ width, height }}>
      <Text
        className="font-lobster text-white"
        style={{ fontSize: `${size}rem` }}>
        Quizzy!
      </Text>
    </div>
  )
}
