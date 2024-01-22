import { Box } from "shared/ui/Box"
import { QuizzyImage } from "shared/ui/QuizzyImage"
import { Caption, Subheading } from "shared/ui/Typography"
import { Star } from "shared/icons/Star"
import { Button } from "shared/ui/Button"

export function Quiz() {
  return (
    <Box className="h-full basis-80 px-0 pt-0">
      <QuizzyImage
        className="mb-3 rounded-t-md"
        height="7.25rem"
        size={1.5}
        width="100%"
      />
      <div className="px-4">
        <div className="mb-2 flex items-center justify-between">
          <Subheading>Quiz name</Subheading>
          <button type="button">
            <Star color="#FFB800" width={1.25} />
          </button>
        </div>
        <Caption className="mb-5 block">112 plays</Caption>
        <Button className="mb-6 px-8" variant="secondary">
          Start
        </Button>
        <Caption className="mb-6 inline-block text-[rgba(0,0,0,0.5)]">
          Quiz Description. Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
        </Caption>
        <div className="flex items-center gap-1.5">
          <div className="h-7 w-7 rounded-full bg-gray" />
          <Caption className="font-bold">@nickname</Caption>
        </div>
      </div>
    </Box>
  )
}
