import type { Meta, StoryObj } from "@storybook/react"

import { QuizzyImage as Component } from "./index"

const meta: Meta<typeof Component> = {
  title: "Shared/ui/QuizzyImage",
  component: Component,
}

export default meta

type Story = StoryObj<typeof Component>

export const QuizzyImage: Story = {}
