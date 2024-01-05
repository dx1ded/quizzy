import type { Meta, StoryObj } from "@storybook/react"

import { Spinner as Component } from "./index"

const meta: Meta<typeof Component> = {
  title: "Shared/ui/Spinner",
  component: Component,
}

export default meta

type Story = StoryObj<typeof Component>

export const Spinner: Story = {}
