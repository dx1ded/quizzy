import { Subheading } from "shared/ui/Typography"
import { Input } from "shared/ui/Input"

export function SearchSection() {
  return (
    <section className="rounded bg-accent py-20 text-center">
      <Subheading className="mb-6 text-white">Search for</Subheading>
      <Input
        className="inline-block w-[30rem] rounded-lg border-none py-2"
        placeholder="Search for public quizzes"
        withMagnifier
      />
    </section>
  )
}
