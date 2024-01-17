import type { Meta, StoryObj } from "@storybook/react"

import { Box as Component } from "./index"

const meta: Meta<typeof Component> = {
  title: "Shared/ui/Box",
  component: Component,
  args: {
    children: "I'm in the box!",
  },
}

export default meta

type Story = StoryObj<typeof Component>

export const Box: Story = {}
