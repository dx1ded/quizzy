import type { Meta, StoryObj } from "@storybook/react"

import { Avatar as Component } from "./index"

const meta: Meta<typeof Component> = {
  title: "Shared/ui/Box",
  component: Component,
}

export default meta

type Story = StoryObj<typeof Component>

export const Avatar: Story = {}
