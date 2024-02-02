import { useContext } from "react"
import { Snackbar } from "@mui/material"
import { EditContext } from "../model"

export function FileTooLargeMessage() {
  const { messageOpen, setMessageOpen } = useContext(EditContext)

  return (
    <Snackbar
      autoHideDuration={5000}
      message="File should be less than 2MB"
      open={messageOpen}
      onClose={() => setMessageOpen(false)}
    />
  )
}
