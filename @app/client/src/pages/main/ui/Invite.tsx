import { Container } from "shared/ui/Container"
import { Heading, Text } from "shared/ui/Typography"
import friends from "assets/friends-hugging.png"

export function Invite() {
  return (
    <section className="py-24">
      <Container className="flex items-center justify-between">
        <div>
          <Heading className="mb-5">Don't forget to invite friends!</Heading>
          <Text className="max-w-xl">
            Sharing the fun with your peers not only adds a social dimension to
            the learning process but also contributes to the vitality of our
            awesome app.
          </Text>
        </div>
        <img
          alt="Friends hugging each other"
          className="max-w-lg"
          src={friends}
        />
      </Container>
    </section>
  )
}
