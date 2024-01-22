import { QuizzyImage } from "shared/ui/QuizzyImage"
import { Button } from "shared/ui/Button"

interface QuizCardProps {
  image?: string
}

export function QuizCard({ image }: QuizCardProps) {
  return (
    <div className="group h-[9.75rem]">
      {image ? (
        <img alt="Quiz" src={image} />
      ) : (
        <QuizzyImage
          className="rounded-lg"
          height="100%"
          size={1.5}
          width="100%"
        />
      )}
      <Button
        className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-20 px-20 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
        size="md"
        variant="secondary">
        Practice
      </Button>
    </div>
  )
}
