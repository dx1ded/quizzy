import {
  useRef,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useCallback,
} from "react"
import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"
import { Menu, MenuItem } from "@mui/material"
import { useSecuredRequest } from "entities/account"
import { More } from "shared/icons/More"
import { Checkbox } from "shared/ui/Checkbox"
import { ConfirmModal } from "shared/ui/ConfirmModal"
import { SelectedState } from "./index"

interface RecordProps {
  id: string
  quizId: string
  quizName: string
  date: number
  numberOfPlayers: number
  isCreator: boolean
  refetch(): void
  selected: SelectedState
  setSelected: Dispatch<SetStateAction<SelectedState>>
}

export function Record({
  id,
  quizId,
  quizName,
  date,
  numberOfPlayers,
  isCreator,
  refetch,
  selected,
  setSelected,
}: RecordProps) {
  const request = useSecuredRequest()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const anchorEl = useRef<HTMLButtonElement>(null)
  const checkboxRef = useRef<HTMLInputElement>(null)

  const deleteRecord = () => {
    request("/api/record/delete", {
      method: "DELETE",
      body: { id },
    }).then(() => refetch())

    setModalOpen(false)
  }

  const clickHandler = () => {
    setModalOpen(true)
    setMenuOpen(false)
  }

  const changeChecked = useCallback(
    (checked: boolean) => {
      setSelected((prevState) =>
        checked
          ? { ...prevState, ids: [...prevState.ids, id] }
          : {
              ...prevState,
              ids: prevState.ids.filter((recordId) => recordId !== id),
            }
      )
    },
    [id, setSelected]
  )

  useEffect(() => {
    if (!checkboxRef.current) return
    checkboxRef.current.checked = selected.checked

    changeChecked(checkboxRef.current.checked)
  }, [changeChecked, selected.checked])

  return (
    <>
      <ConfirmModal
        buttonText="Delete"
        description="Are you sure you want to delete the record? You won't be able to restore it."
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        title="Delete the record?"
        onConfirm={deleteRecord}
      />
      <div className="border-gray grid grid-cols-reports-table items-center gap-4 px-3 py-3.5 lg:px-2 lg:py-2.5 sm:grid-cols-reports-table-sm [&:not(:last-child)]:border-b">
        <div className="sm:hidden">
          {isCreator && (
            <Checkbox
              ref={checkboxRef}
              className="align-middle"
              defaultChecked={selected.checked}
              name="record-checkbox"
              onChange={(e) => changeChecked(e.target.checked)}
            />
          )}
        </div>
        <span>{quizName}</span>
        <span>{dayjs(+date).format("MMM D, YYYY, h:mm A")}</span>
        <span>{numberOfPlayers}</span>
        <div>
          <button
            ref={anchorEl}
            className="align-middle"
            type="button"
            onClick={() => setMenuOpen(true)}>
            <More color="#C8C8C8" height={1} width={1} />
          </button>
          <Menu
            anchorEl={anchorEl.current}
            open={menuOpen}
            onClose={() => setMenuOpen(false)}>
            <MenuItem onClick={() => navigate(`/quiz/${quizId}`)}>
              <span className="text-sm">Play</span>
            </MenuItem>
            {isCreator && (
              <MenuItem onClick={clickHandler}>
                <span className="text-sm text-red-600">Delete</span>
              </MenuItem>
            )}
          </Menu>
        </div>
      </div>
    </>
  )
}
