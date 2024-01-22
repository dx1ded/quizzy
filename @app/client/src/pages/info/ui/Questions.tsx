import { Box } from "shared/ui/Box"
import { Subheading } from "shared/ui/Typography"
import QuizBackground from "assets/quiz-background.png"
import { Question } from "./Question"

export function Questions() {
  return (
    <Box className="h-full flex-1">
      <Subheading className="mb-5">
        Questions (<span className="text-secondary">12</span>)
      </Subheading>
      <div className="flex flex-col gap-3">
        <Question
          image={QuizBackground}
          n={1}
          name="Is there any animal who’s faster than a cheetah?"
          time={10}
        />
        <Question
          image={QuizBackground}
          n={1}
          name="Is there any animal who’s faster than a cheetah?"
          time={10}
        />
        <Question
          image={QuizBackground}
          n={1}
          name="Is there any animal who’s faster than a cheetah?"
          time={10}
        />
        <Question
          image={QuizBackground}
          n={1}
          name="Is there any animal who’s faster than a cheetah?"
          time={10}
        />
        <Question
          image={QuizBackground}
          n={1}
          name="Is there any animal who’s faster than a cheetah?"
          time={10}
        />
        <Question
          image={QuizBackground}
          n={1}
          name="Is there any animal who’s faster than a cheetah?"
          time={10}
        />
        <Question
          image={QuizBackground}
          n={1}
          name="Is there any animal who’s faster than a cheetah?"
          time={10}
        />
      </div>
    </Box>
  )
}
