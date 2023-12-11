import type { Meta, StoryObj } from "@storybook/react"

import { Heading as Component } from "./index"

const meta: Meta<typeof Component> = {
  title: "Shared/ui/Typography",
  component: Component,
  args: { children: "Heading" },
}

export default meta

type Story = StoryObj<typeof Component>

export const Heading: Story = {}
