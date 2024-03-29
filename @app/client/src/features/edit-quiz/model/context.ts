import { createContext, Dispatch, SetStateAction } from "react"

interface EditContextType {
  /**
   * These props are needed to open the settings modal
   */
  modalOpen: boolean
  setModalOpen: Dispatch<SetStateAction<boolean>>
  /**
   * These props are needed to open the message says "less than 2mb file"
   */
  messageOpen: boolean
  setMessageOpen: Dispatch<SetStateAction<boolean>>
  /**
   * Submit handler function
   */
  submitHandler(): void
}

const initialState: EditContextType = {
  modalOpen: false,
  setModalOpen() {},
  messageOpen: false,
  setMessageOpen() {},
  submitHandler() {},
}

export const EditContext = createContext<EditContextType>(initialState)
