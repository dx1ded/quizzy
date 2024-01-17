import { Box } from "shared/ui/Box"
import { Subheading, Text } from "shared/ui/Typography"
import { Button } from "shared/ui/Button"
import { AddQuizBox, QuizBox } from "./QuizBox"

export function GetStarted() {
  return (
    <Box className="flex-1">
      <Subheading className="mb-1">Let's get started</Subheading>
      <Text className="mb-5">
        Become a <span className="font-lobster text-secondary">Quizzy</span>{" "}
        master by practicing our top quizzes.
      </Text>
      <div className="grid grid-cols-3 gap-x-6 gap-y-7">
        <AddQuizBox />
        <QuizBox
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut interdum velit. Suspendisse lacus dolor, ultricies nec auctor a, efficitur convallis lacus. Cras pellentesque diam eu erat porta, tempor mattis enim convallis. Nullam commodo magna facilisis, finibus velit eget, suscipit nibh. Phasellus"
          name="Quiz name"
        />
        <QuizBox
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut interdum velit. Suspendisse lacus dolor, ultricies nec auctor a, efficitur convallis lacus. Cras pellentesque diam eu erat porta, tempor mattis enim convallis. Nullam commodo magna facilisis, finibus velit eget, suscipit nibh. Phasellus"
          name="Quiz name"
        />
        <QuizBox
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut interdum velit. Suspendisse lacus dolor, ultricies nec auctor a, efficitur convallis lacus. Cras pellentesque diam eu erat porta, tempor mattis enim convallis. Nullam commodo magna facilisis, finibus velit eget, suscipit nibh. Phasellus"
          name="Quiz name"
        />
        <QuizBox
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut interdum velit. Suspendisse lacus dolor, ultricies nec auctor a, efficitur convallis lacus. Cras pellentesque diam eu erat porta, tempor mattis enim convallis. Nullam commodo magna facilisis, finibus velit eget, suscipit nibh. Phasellus"
          name="Quiz name"
        />
        <QuizBox
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut interdum velit. Suspendisse lacus dolor, ultricies nec auctor a, efficitur convallis lacus. Cras pellentesque diam eu erat porta, tempor mattis enim convallis. Nullam commodo magna facilisis, finibus velit eget, suscipit nibh. Phasellus"
          name="Quiz name"
        />
      </div>
      <Button className="mx-auto mt-9 block px-8" size="md" variant="white">
        Load more
      </Button>
    </Box>
  )
}
