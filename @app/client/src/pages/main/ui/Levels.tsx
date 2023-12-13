import { Container } from "shared/ui/Container"
import { Heading, Text } from "shared/ui/Typography"
import svg from "assets/people-creating-design.svg"

export function Levels() {
  return (
    <section className="py-14">
      <Container className="flex items-center justify-between">
        <img
          alt="Tiny people creating a design"
          className="max-w-2xl"
          src={svg}
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
