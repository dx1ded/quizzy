import type { Meta, StoryObj } from "@storybook/react"

import { Logo } from "./index"

const meta: Meta<typeof Logo> = {
  title: "Shared/ui/Logo",
  component: Logo,
}

export default meta

type Story = StoryObj<typeof Logo>

export const DEFAULT: Story = {}
