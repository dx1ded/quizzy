import { Dispatch, SetStateAction, useContext, useState } from "react"
import { Modal } from "@mui/material"
import { AvatarType } from "@quizzy/common"
import { Edit } from "shared/icons/Edit"
import { Avatar } from "shared/ui/Avatar"
import { Button } from "shared/ui/Button"
import { Subheading, Text } from "shared/ui/Typography"
import { PlayContext } from "../../model"

interface ChooseAvatarModalProps {
  currentAvatar: AvatarType
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const avatarsList: AvatarType[] = [
  "monkey",
  "squirrel",
  "racoon",
  "hamster",
  "fox",
  "bunny",
  "wolf",
  "pig",
  "elk",
  "bear",
  "cat",
  "panda",
  "zebra",
  "donkey",
  "elephant",
  "rabbit",
]

function ChooseAvatarModal({
  open,
  setOpen,
  currentAvatar,
}: ChooseAvatarModalProps) {
  const { sendJsonMessage, playerToken } = useContext(PlayContext)
  const [avatar, setAvatar] = useState(currentAvatar)

  const clickHandler = () => {
    if (currentAvatar === avatar) return setOpen(false)

    sendJsonMessage({
      type: "change_avatar",
      body: {
        playerToken,
        avatar,
      },
    })

    setOpen(false)
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className="absolute left-1/2 top-1/2 w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-4 pt-6">
        <div className="grid grid-cols-4 gap-3">
          {avatarsList.map((avatarName, i) => (
            <div key={i} className="relative">
              <input
                className="visually-hidden peer"
                defaultChecked={avatarName === avatar}
                defaultValue={avatarName}
                id={`avatar-${avatarName}`}
                name="avatars-list"
                type="radio"
                onChange={(e) => setAvatar(e.target.value as AvatarType)}
              />
              <label
                className="absolute h-full w-full cursor-pointer rounded-full border-secondary peer-checked:border-4"
                htmlFor={`avatar-${avatarName}`}
              />
              <Avatar height="100%" name={avatarName} width="100%" />
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end gap-2 border-t border-gray pt-4">
          <Button
            className="px-5"
            size="md"
            variant="white"
            onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button
            className="px-5"
            size="md"
            variant="secondary"
            onClick={clickHandler}>
            Select
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export function ChooseAvatar() {
  const { state, playerToken, sendJsonMessage } = useContext(PlayContext)
  const [modalOpen, setModalOpen] = useState(false)

  if (!state) return

  const player = state.players.find((player) => player.token === playerToken)!

  const setMenu = () => {
    sendJsonMessage({
      type: "menu",
    })
  }

  return (
    <div className="absolute flex h-full w-full flex-col items-center justify-center">
      <ChooseAvatarModal
        currentAvatar={player.avatar}
        open={modalOpen}
        setOpen={setModalOpen}
      />
      <img
        alt="Quiz"
        className="fixed left-0 top-0 -z-10 h-full w-full object-cover"
        src="https://firebasestorage.googleapis.com/v0/b/quizzy-222b7.appspot.com/o/quiz-background.png?alt=media"
      />
      <div className="text-center">
        <div className="relative mb-3 inline-block">
          <Avatar
            className="mx-auto"
            height="12.5rem"
            name={player.avatar}
            width="12.5rem"
          />
          <button
            aria-label="Open the menu to choose avatar"
            className="absolute -right-1.5 top-3 flex h-9 w-9 items-center justify-center rounded bg-white shadow"
            type="button"
            onClick={() => setModalOpen(true)}>
            <Edit width={1.25} />
          </button>
        </div>
        <Subheading className="text-white">{player.nickname}</Subheading>
        {state.stage === "settings" ? (
          <Button className="mt-3 px-7" variant="secondary" onClick={setMenu}>
            Next
          </Button>
        ) : (
          <Text className="font-semibold text-white">
            Get ready for the questions!
          </Text>
        )}
      </div>
    </div>
  )
}
