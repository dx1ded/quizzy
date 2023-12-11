import type { Meta, StoryObj } from "@storybook/react"

import { Radio } from "./index"

const meta: Meta<typeof Radio> = {
  title: "Shared/ui/Radio",
  component: Radio,
  args: { name: "group" },
  argTypes: {
    onClick: { action: "onClick" },
  },
}

export default meta

type Story = StoryObj<typeof Radio>

export const Unchecked: Story = {}

export const Checked: Story = {
  args: { checked: true },
}
