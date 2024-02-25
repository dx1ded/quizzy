import { Container } from "shared/ui/Container"
import { Heading, Text } from "shared/ui/Typography"

export function Levels() {
  return (
    <section className="py-14 md:py-8">
      <Container className="flex items-center justify-between gap-x-4 sm:gap-x-0">
        <div className="max-w-2xl xs:hidden">
          <img
            alt="Tiny people creating a design"
            className="w-full"
            src="https://firebasestorage.googleapis.com/v0/b/quizzy-222b7.appspot.com/o/people-creating-design.svg?alt=media"
          />
        </div>
        <div className="text-right xs:text-left">
          <Heading className="mb-4">
            Create your own awesome{" "}
            <span className="text-primary">levels!</span>
          </Heading>
          <Text className="ml-auto max-w-xl">
            With intuitive tools and a seamless platform, educators and content
            creators can easily craft diverse and engaging learning experiences.
            Whether you are tailoring quizzes and challenges.
          </Text>
        </div>
      </Container>
    </section>
  )
}
