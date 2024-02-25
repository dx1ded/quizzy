import { Container } from "shared/ui/Container"
import { Heading, Text } from "shared/ui/Typography"

export function Invite() {
  return (
    <section className="py-24 lg:py-16 sm:py-12">
      <Container className="flex items-center justify-between gap-x-4">
        <div>
          <Heading className="mb-5 md:mb-3">
            Don't forget to invite friends!
          </Heading>
          <Text className="max-w-xl">
            Sharing the fun with your peers not only adds a social dimension to
            the learning process but also contributes to the vitality of our
            awesome app.
          </Text>
        </div>
        <div className="max-w-lg xs:hidden">
          <img
            alt="Friends hugging each other"
            className="w-full"
            src="https://firebasestorage.googleapis.com/v0/b/quizzy-222b7.appspot.com/o/friends-hugging.png?alt=media"
          />
        </div>
      </Container>
    </section>
  )
}
