import type { Meta, StoryObj } from "@storybook/react"

import { Sidebar as Component } from "./index"

const meta: Meta<typeof Component> = {
  title: "Shared/ui/Sidebar",
  component: Component,
}

export default meta

type Story = StoryObj<typeof Component>

export const Sidebar: Story = {}
