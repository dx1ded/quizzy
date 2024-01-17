import { Heading } from "shared/ui/Typography"
import { Input } from "shared/ui/Input"
import { Button } from "shared/ui/Button"

export function Play() {
  return (
    <div className="h-screen w-full bg-primary">
      <div className="-translate-1/2 absolute left-1/2 top-1/2 text-center">
        <Heading className="font-lobster">Quizzy Time!</Heading>
        <div className="flex w-72 flex-col bg-white">
          <Input variant="secondary" width={100} />
          <Button variant="secondary">Enter</Button>
        </div>
      </div>
    </div>
  )
}
