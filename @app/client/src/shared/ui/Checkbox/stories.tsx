import type { Meta, StoryObj } from "@storybook/react"

import { Checkbox } from "./index"

const meta: Meta<typeof Checkbox> = {
  title: "Shared/ui/Checkbox",
  component: Checkbox,
  args: { name: "group" },
  argTypes: {
    onClick: { action: "onClick" },
  },
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Unchecked: Story = {}

export const Checked: Story = {
  args: { checked: true },
}
