import type { Meta, StoryObj } from "@storybook/react"

import { Button } from "./index"

const meta: Meta<typeof Button> = {
  title: "Shared/ui/Button",
  component: Button,
  args: { children: "Hello World!" },
  argTypes: {
    variant: { control: { type: "select" } },
    size: { control: { type: "select" } },
    onClick: { action: "onClick" },
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {}

export const Secondary: Story = {
  args: { variant: "secondary" },
}

export const White: Story = {
  args: { variant: "white" },
}

export const Large: Story = {
  args: { size: "lg" },
}

export const Medium: Story = {
  args: { size: "md" },
}

export const Small: Story = {
  args: { size: "sm" },
}

export const ExtraSmall: Story = {
  args: { size: "xs" },
}
