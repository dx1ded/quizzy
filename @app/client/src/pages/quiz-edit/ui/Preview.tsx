import QuizBackground from "assets/quiz-background.png"
import QuizImage from "assets/people-creating-design.svg"
import { Button } from "shared/ui/Button"
import { PreviewQuestion } from "./PreviewQuestion"

export function Preview() {
  return (
    <aside className="flex basis-56 flex-col gap-4 px-2 py-1.5">
      <PreviewQuestion
        answers={["Math", "Chemistry", "Work", "Job"]}
        bg={QuizBackground}
        checked={[0, 1]}
        n={1}
        name="What is the best animal?"
        isActive
      />
      <PreviewQuestion
        answers={["Math", "Chemistry", "Work", "Job"]}
        bg={QuizBackground}
        checked={[0, 1]}
        n={2}
        name="What is the best animal?"
      />
      <PreviewQuestion
        answers={["Math", "Chemistry", "Work", "Job"]}
        bg={QuizBackground}
        checked={[0, 1]}
        image={QuizImage}
        n={3}
        name="What is the best animal?"
      />
      <Button size="md" variant="white">
        Add question
      </Button>
    </aside>
  )
}
