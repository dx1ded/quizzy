import type { Meta, StoryObj } from "@storybook/react"

import { Caption as Component } from "./index"

const meta: Meta<typeof Component> = {
  title: "Shared/ui/Typography",
  component: Component,
  args: { children: "Caption" },
}

export default meta

type Story = StoryObj<typeof Component>

export const Caption: Story = {}
