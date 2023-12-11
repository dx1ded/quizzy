import type { Meta, StoryObj } from "@storybook/react"

import { Edit as Icon } from "./index"

const meta: Meta<typeof Icon> = {
  title: "Shared/icons",
  component: Icon,
  args: { width: 2 },
}

export default meta

type Story = StoryObj<typeof Icon>

export const Edit: Story = {}
