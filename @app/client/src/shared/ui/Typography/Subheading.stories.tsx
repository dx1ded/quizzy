import type { Meta, StoryObj } from "@storybook/react"

import { Subheading as Component } from "./index"

const meta: Meta<typeof Component> = {
  title: "Shared/ui/Typography",
  component: Component,
  args: { children: "Subheading" },
}

export default meta

type Story = StoryObj<typeof Component>

export const Subheading: Story = {}
