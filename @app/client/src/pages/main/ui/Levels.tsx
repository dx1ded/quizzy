import { Container } from "shared/ui/Container"
import { Heading, Text } from "shared/ui/Typography"

export function Levels() {
  return (
    <section className="py-14">
      <Container className="flex items-center justify-between">
        <img
          alt="Tiny people creating a design"
          className="max-w-2xl"
          src="https://firebasestorage.googleapis.com/v0/b/quizzy-222b7.appspot.com/o/people-creating-design.svg?alt=media"
        />
        <div className="text-right">
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
