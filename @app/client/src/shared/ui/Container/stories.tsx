import type { Meta, StoryFn } from "@storybook/react"

import { Container } from "./index"

const meta: Meta<typeof Container> = {
  title: "Shared/ui/Container",
  component: Container,
}

export default meta

const Template: StoryFn<typeof Container> = () => (
  <Container>
    <div className="mb-4 flex h-32 items-center justify-center bg-secondary text-4xl text-white">
      Section 1
    </div>
    <div className="mb-4 flex h-32 items-center justify-center bg-primary text-4xl text-white">
      Section 2
    </div>
  </Container>
)

export const DEFAULT = Template.bind({})
