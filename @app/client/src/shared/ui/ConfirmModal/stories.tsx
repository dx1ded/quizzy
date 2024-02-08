import type { Meta, StoryObj } from "@storybook/react"

import { ConfirmModal as Component } from "./index"

const meta: Meta<typeof Component> = {
  title: "Shared/ui/ConfirmModal",
  component: Component,
}

export default meta

type Story = StoryObj<typeof Component>

export const ConfirmModal: Story = {}
