import { NavLink } from "react-router-dom"
import { Container } from "shared/ui/Container"
import { Heading, Text } from "shared/ui/Typography"
import { Logo } from "shared/ui/Logo"
import { Button } from "shared/ui/Button"

export function Hero() {
  return (
    <section className="my-8">
      <Container className="flex items-center justify-between">
        <div>
          <Heading className="mb-6 max-w-sm">
            Dive into the Excitement with&nbsp;
            <Logo as="span" size={2} />
          </Heading>
          <Text className="mb-6 max-w-sm">
            Dive into the vibrant world of interactive learning. Discover a
            realm where knowledge comes alive through engaging experiences.
          </Text>
          <Button as={NavLink} className="px-7 py-2" to="/auth">
            Sign up for free
          </Button>
        </div>
        <div>
          <img
            alt="Woman looking for people"
            className="max-w-2xl"
            src="https://firebasestorage.googleapis.com/v0/b/quizzy-222b7.appspot.com/o/woman-looking-for-people.gif?alt=media"
          />
        </div>
      </Container>
    </section>
  )
}
