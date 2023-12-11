import type { Meta, StoryObj } from "@storybook/react"

import { LogoBlack } from "./index"

const meta: Meta<typeof LogoBlack> = {
  title: "Shared/ui/Logo",
  component: LogoBlack,
}

export default meta

type Story = StoryObj<typeof LogoBlack>

export const Black: Story = {}
