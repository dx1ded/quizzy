import { Container } from "shared/ui/Container"
import { Heading, Subheading } from "shared/ui/Typography"

export function HowToStart() {
  return (
    <section className="bg-primary pb-40 pt-16">
      <Container>
        <Heading className="mb-20 text-center text-white">
          It's easy to{" "}
          <span className="relative after:absolute after:bottom-0 after:left-0 after:block after:h-0.5 after:w-full after:bg-secondary">
            start!
          </span>
        </Heading>
        <div className="flex items-center justify-between gap-x-4">
          <div className="relative shrink-0 basis-60 text-center">
            <div className="mx-auto mb-4 flex h-40 w-40 items-center justify-center rounded-full bg-secondary">
              <Heading className="font-lobster text-white">1</Heading>
            </div>
            <Subheading className="absolute inset-x-0 text-white">
              Register an account
            </Subheading>
          </div>
          <div className="h-[3px] w-full bg-secondary" />
          <div className="relative shrink-0 basis-60 text-center">
            <div className="mx-auto mb-4 flex h-40 w-40 items-center justify-center rounded-full bg-secondary">
              <Heading className="font-lobster text-white">2</Heading>
            </div>
            <Subheading className="absolute inset-x-0 text-white">
              Choose a level
            </Subheading>
          </div>
          <div className="h-[3px] w-full bg-secondary" />
          <div className="relative shrink-0 basis-60 text-center">
            <div className="mx-auto mb-4 flex h-40 w-40 items-center justify-center rounded-full bg-secondary">
              <Heading className="font-lobster text-white">3</Heading>
            </div>
            <Subheading className="absolute inset-x-0 text-white">
              Invite friends and play!
            </Subheading>
          </div>
        </div>
      </Container>
    </section>
  )
}
