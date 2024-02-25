import { Container } from "shared/ui/Container"
import { Caption, Heading } from "shared/ui/Typography"

export function Examples() {
  return (
    <section className="bg-primary pb-24 pt-14 md:pb-16 md:pt-10 sm:pb-12 sm:pt-8">
      <Container>
        <Heading className="mb-4 text-center text-white">
          You will have a lot of{" "}
          <span className="font-lobster text-accent">fun!</span>
        </Heading>
        <Caption className="mx-auto mb-16 block max-w-lg text-center text-white lg:mb-10 md:mb-7">
          At Quizzy, the fun never stops as you immerse yourself in a world of
          interactive learning adventures. Engage in lively quizzes that
          challenge your knowledge and spark friendly competition with friends
          or fellow learners.
        </Caption>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-2">
          <div>
            <img
              alt="In-game functionaly"
              className="w-full rounded"
              src="https://dummyimage.com/350x190/D9D9D9/fff"
            />
          </div>
          <div>
            <img
              alt="In-game functionaly"
              className="w-full rounded"
              src="https://dummyimage.com/350x190/D9D9D9/fff"
            />
          </div>
          <div className="sm:col-span-2">
            <img
              alt="In-game functionaly"
              className="w-full rounded"
              src="https://dummyimage.com/350x190/D9D9D9/fff"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
