import type { Meta, StoryObj } from "@storybook/react"

import { Burger as Component } from "./index"

const meta: Meta<typeof Component> = {
  title: "Shared/ui/Burger",
  component: Component,
}

export default meta

type Story = StoryObj<typeof Component>

export const Burger: Story = {}
