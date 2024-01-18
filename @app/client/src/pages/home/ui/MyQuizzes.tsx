import { Subheading } from "shared/ui/Typography"
import { Box } from "shared/ui/Box"
import { Quiz } from "./Quiz"

export function MyQuizzes() {
  return (
    <Box className="basis-80">
      <Subheading className="mb-5">My Quizzes</Subheading>
      <div className="flex flex-col gap-2.5">
        <Quiz name="Quiz name" plays={12} />
        <Quiz name="Quiz name" plays={12} />
        <Quiz name="Quiz name" plays={12} />
      </div>
      <button className="mx-auto mt-5 block px-5 text-sm" type="button">
        See all <span className="text-secondary">(12)</span>
      </button>
    </Box>
  )
}
