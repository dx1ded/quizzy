import QuizBackground from "assets/quiz-background.png"
import { Input } from "shared/ui/Input"
import { Button } from "shared/ui/Button"
import { Text } from "shared/ui/Typography"
import {
  CircleAnswer,
  RhombusAnswer,
  SquareAnswer,
  TriangleAnswer,
} from "shared/ui/Answer"

export function Question() {
  return (
    <main className="relative h-[48rem] flex-1">
      <img
        alt="Quiz"
        className="absolute left-0 top-0 -z-10 h-full w-full object-cover"
        src={QuizBackground}
      />
      <div className="flex h-full flex-col items-center justify-between px-5 py-10">
        <Input
          className="w-[28.75rem] py-2 text-xl shadow-lg"
          placeholder="Start typing your question..."
          isCentered
        />
        <div className="flex h-80 w-96 flex-col items-center justify-center rounded bg-white shadow-lg">
          <Button
            aria-label="Add picture"
            className="mb-5 h-16 w-16 text-xl"
            variant="secondary">
            +
          </Button>
          <Text className="font-bold">Find or insert media</Text>
        </div>
        <div className="grid w-full grid-cols-2 gap-4">
          <TriangleAnswer>Math</TriangleAnswer>
          <RhombusAnswer>Chemistry</RhombusAnswer>
          <CircleAnswer>Pre-calc</CircleAnswer>
          <SquareAnswer>Something else</SquareAnswer>
        </div>
      </div>
    </main>
  )
}
