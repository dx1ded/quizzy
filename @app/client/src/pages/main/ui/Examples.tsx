import { Container } from "shared/ui/Container"
import { Caption, Heading } from "shared/ui/Typography"

export function Examples() {
  return (
    <section className="bg-primary pb-24 pt-14">
      <Container>
        <Heading className="mb-4 text-center text-white">
          You will have a lot of{" "}
          <span className="font-lobster text-accent">fun!</span>
        </Heading>
        <Caption className="mx-auto mb-16 block max-w-lg text-center text-white">
          At Quizzy, the fun never stops as you immerse yourself in a world of
          interactive learning adventures. Engage in lively quizzes that
          challenge your knowledge and spark friendly competition with friends
          or fellow learners.
        </Caption>
        <div className="flex items-center justify-between">
          <img
            alt="In-game process"
            className="max-w-[21.875rem] rounded"
            src="https://dummyimage.com/350x190/D9D9D9/fff"
          />
          <img
            alt="In-game process"
            className="max-w-[21.875rem] rounded"
            src="https://dummyimage.com/350x190/D9D9D9/fff"
          />
          <img
            alt="In-game process"
            className="max-w-[21.875rem] rounded"
            src="https://dummyimage.com/350x190/D9D9D9/fff"
          />
        </div>
      </Container>
    </section>
  )
}
