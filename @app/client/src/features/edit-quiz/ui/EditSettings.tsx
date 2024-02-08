import { useContext } from "react"
import { Settings } from "shared/icons/Settings"
import { EditContext } from "../model"

export function EditSettings() {
  const { setModalOpen } = useContext(EditContext)

  return (
    <button
      aria-label="Open settings"
      type="button"
      onClick={() => setModalOpen(true)}>
      <Settings width={1.5} />
    </button>
  )
}
