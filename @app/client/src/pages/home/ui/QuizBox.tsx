import { QuizzyImage } from "shared/ui/QuizzyImage"
import { Text } from "shared/ui/Typography"
import { Button } from "shared/ui/Button"

interface QuizBoxProps {
  name: string
  description: string
}

export function QuizBox({ name, description }: QuizBoxProps) {
  return (
    <div className="rounded-lg shadow-md">
      <QuizzyImage className="rounded-t-lg" height="4.5rem" width="100%" />
      <div className="px-3.5 pb-4 pt-2">
        <Text className="mb-1">{name}</Text>
        <span className="mb-4 line-clamp-3 text-[0.75rem]">{description}</span>
        <Button className="w-full" size="md" variant="white">
          Practice
        </Button>
      </div>
    </div>
  )
}

export function AddQuizBox() {
  return (
    <div className="flex flex-col rounded-lg shadow-md">
      <QuizzyImage className="rounded-t-lg" height="4.5rem" width="100%" />
      <div className="flex flex-1 flex-col items-center justify-center px-3.5 pb-4 pt-2">
        <Button
          aria-label="Create a new quiz"
          className="mb-2 h-12 w-12"
          style={{ fontSize: "1.5rem" }}
          variant="secondary">
          +
        </Button>
        <Text>Create a new quiz</Text>
      </div>
    </div>
  )
}
