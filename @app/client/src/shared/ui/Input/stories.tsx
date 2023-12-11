import type { Meta, StoryObj } from "@storybook/react"

import { Input } from "./index"

const meta: Meta<typeof Input> = {
  title: "Shared/ui/Input",
  component: Input,
  args: { placeholder: "Input" },
  argTypes: {
    variant: { control: { type: "select" } },
  },
}

export default meta

type Story = StoryObj<typeof Input>

export const Primary: Story = {}

export const Secondary: Story = {
  args: { variant: "secondary" },
}
