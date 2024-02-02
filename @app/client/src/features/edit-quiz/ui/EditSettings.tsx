import { useContext } from "react"
import { Button } from "shared/ui/Button"
import { EditContext } from "../model"

export function EditSettings() {
  const { setModalOpen } = useContext(EditContext)

  return (
    <Button
      className="px-6"
      variant="secondary"
      onClick={() => setModalOpen(true)}>
      Settings
    </Button>
  )
}
