import { Dispatch, SetStateAction, useState } from "react"
import { Dialog } from "@mui/material"
import { Button } from "../Button"
import { Caption, Text } from "../Typography"

interface ConfirmModalProps {
  title: string
  description: string
  buttonText: string
  isOpen?: boolean
  setIsOpen?: Dispatch<SetStateAction<boolean>>
  onConfirm(): void
}

export function ConfirmModal({
  title,
  description,
  buttonText,
  isOpen,
  setIsOpen,
  onConfirm,
}: ConfirmModalProps) {
  const [localIsOpen, setLocalIsOpen] = useState(false)

  const toggleFn = setIsOpen || setLocalIsOpen

  return (
    <Dialog open={isOpen || localIsOpen} onClose={() => toggleFn(false)}>
      <div className="max-w-md p-4">
        <Text className="mb-3 !font-semibold">{title}</Text>
        <Caption className="mb-5 inline-block leading-5">{description}</Caption>
        <div className="border-gray flex items-center gap-2.5 border-t pt-3">
          <Button
            className="px-5"
            size="md"
            variant="white"
            onClick={() => toggleFn(false)}>
            Close
          </Button>
          <Button
            className="px-5"
            size="md"
            variant="secondary"
            onClick={onConfirm}>
            {buttonText}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
