import type { Meta, StoryObj } from "@storybook/react"

import { Text as Component } from "./index"

const meta: Meta<typeof Component> = {
  title: "Shared/ui/Typography",
  component: Component,
  args: { children: "Text" },
}

export default meta

type Story = StoryObj<typeof Component>

export const Text: Story = {}
