import { Snackbar } from "@mui/material"
import { useContext, useState } from "react"
import { Avatar } from "shared/ui/Avatar"
import { Button } from "shared/ui/Button"
import { Logo } from "shared/ui/Logo"
import { Subheading, Text } from "shared/ui/Typography"
import { PlayContext } from "../../model"

export function PlayersList() {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const { state, sendJsonMessage } = useContext(PlayContext)

  const start = () => {
    if (state.players.length < 3) {
      return setSnackbarOpen(true)
    }

    sendJsonMessage({
      type: "start",
    })
  }

  return (
    <div className="absolute flex h-full w-full flex-col items-center px-4 pt-16 lg:pt-10 sm:px-2 sm:pt-4">
      <Snackbar
        autoHideDuration={3000}
        message="There should be at least 3 players"
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
      />
      <img
        alt="Quiz"
        className="fixed left-0 top-0 -z-10 h-full w-full object-cover"
        src="https://firebasestorage.googleapis.com/v0/b/quizzy-222b7.appspot.com/o/quiz-background.png?alt=media"
      />
      {/* Start button */}
      <Button
        className="absolute right-5 top-[20rem] px-8 shadow md:top-[13rem] md:px-5"
        variant="secondary"
        onClick={start}>
        Start
      </Button>
      <div className="w-full max-w-[54rem] pb-16">
        <div className="mb-12 flex w-full items-center rounded-lg bg-secondary px-10 text-white shadow-lg lg:gap-16 lg:py-4 md:mb-8 md:px-4 sm:flex-col sm:items-start sm:gap-5">
          <Subheading>
            <span className="font-normal">Join at </span>
            <span className="font-bold">www.quizzy.com/join</span>
          </Subheading>
          <div className="ml-16 mr-11 h-40 lg:hidden">
            <svg
              fill="none"
              height="100%"
              viewBox="0 0 54 169"
              width="100%"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M2.62821 1L51 85L2 167" stroke="white" strokeWidth="4" />
            </svg>
          </div>
          <div>
            <Subheading className="mb-3.5 sm:mb-1.5">Game PIN:</Subheading>
            <h1 className="text-5xl font-extrabold">
              {`${state.sessionId.substring(0, 3)} ${state.sessionId.substring(
                3
              )}`}
            </h1>
          </div>
        </div>
        <Logo
          className="mb-9 text-center lg:mb-7 lg:!text-6xl sm:mb-5 sm:!text-5xl"
          color="#fff"
          size={4.75}
        />
        <div className="grid grid-cols-[minmax(0,20rem)] justify-center gap-5 md:gap-3">
          {state.players.map((player) => (
            <div
              key={player.token}
              className="flex items-center gap-4 rounded bg-white px-5 py-3.5 shadow-lg md:gap-2.5 md:px-3.5 md:py-2">
              <Avatar
                className="md:!h-12 md:!w-12"
                height="4.25rem"
                name={player.avatar}
                width="4.25rem"
              />
              <Text className="font-semibold">@{player.nickname}</Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
