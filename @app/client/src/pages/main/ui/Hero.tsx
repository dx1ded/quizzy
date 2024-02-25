import { NavLink } from "react-router-dom"
import { Container } from "shared/ui/Container"
import { Heading, Text } from "shared/ui/Typography"
import { Button } from "shared/ui/Button"

export function Hero() {
  return (
    <section className="my-8">
      <Container className="flex items-center justify-between gap-x-4 md:gap-x-2">
        <div className="max-w-sm">
          <Heading className="mb-6 lg:mb-4 md:mb-2.5">
            Dive into the Excitement with{" "}
            <span className="font-lobster font-bold text-primary">Quizzy!</span>
          </Heading>
          <Text className="mb-6 lg:mb-4 md:mb-3">
            Dive into the vibrant world of interactive learning. Discover a
            realm where knowledge comes alive through engaging experiences.
          </Text>
          <Button
            as={NavLink}
            className="px-7 py-2 lg:px-5 lg:py-1.5 md:px-3 md:text-xs"
            to="/auth">
            Sign up for free
          </Button>
        </div>
        <div className="min-w-[25rem] max-w-2xl md:min-w-[15rem] sm:min-w-[11rem] xs:hidden">
          <img
            alt="Woman looking for people"
            className="w-full"
            src="https://firebasestorage.googleapis.com/v0/b/quizzy-222b7.appspot.com/o/woman-looking-for-people.gif?alt=media"
          />
        </div>
      </Container>
    </section>
  )
}
