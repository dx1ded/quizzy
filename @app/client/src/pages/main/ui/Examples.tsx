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
              src="https://firebasestorage.googleapis.com/v0/b/quizzy-222b7.appspot.com/o/screenshots%2FScreenshot%202024-11-02%20at%202.24.00%E2%80%AFPM.png?alt=media&token=1d8527b3-d874-47d0-b05e-5f056d94a020"
            />
          </div>
          <div>
            <img
              alt="In-game functionaly"
              className="w-full rounded"
              src="https://firebasestorage.googleapis.com/v0/b/quizzy-222b7.appspot.com/o/screenshots%2FScreenshot%202024-11-02%20at%202.31.02%E2%80%AFPM.png?alt=media&token=85cb4b73-ee0b-46dc-9771-c1762c21a53d"
            />
          </div>
          <div className="sm:col-span-2">
            <img
              alt="In-game functionaly"
              className="w-full rounded"
              src="https://firebasestorage.googleapis.com/v0/b/quizzy-222b7.appspot.com/o/screenshots%2FScreenshot%202024-11-02%20at%202.33.22%E2%80%AFPM.png?alt=media&token=3e732c72-aaaf-497e-8163-36ad4cec5656"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
