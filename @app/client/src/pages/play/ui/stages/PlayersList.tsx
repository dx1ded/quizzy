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
    <div className="absolute flex h-full w-full flex-col items-center pt-16">
      <Snackbar
        autoHideDuration={3000}
        message="There should be at least 3 players"
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
      />
      <img
        alt="Quiz"
        className="absolute left-0 top-0 -z-10 h-full w-full object-cover"
        src="https://firebasestorage.googleapis.com/v0/b/quizzy-222b7.appspot.com/o/quiz-background.png?alt=media"
      />
      {/* Start button */}
      <Button
        className="absolute right-5 top-1/3 px-8 shadow"
        variant="secondary"
        onClick={start}>
        Start
      </Button>
      <div>
        <div className="mb-12 flex w-[54rem] items-center rounded-lg bg-secondary px-10 text-white shadow-lg">
          <Subheading>
            <span className="font-normal">Join at </span>
            <span className="font-bold">www.quizzy.com/join</span>
          </Subheading>
          <div className="ml-16 mr-11 h-40">
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
            <Subheading className="mb-3.5">Game PIN:</Subheading>
            <h1 className="text-5xl font-extrabold">
              {`${state.sessionId.substring(0, 3)} ${state.sessionId.substring(
                3
              )}`}
            </h1>
          </div>
        </div>
        <Logo className="mb-9 text-center" color="#fff" size={4.75} />
        <div className="grid justify-center gap-5">
          {state.players.map((player) => (
            <div
              key={player.token}
              className="flex w-80 items-center gap-4 rounded bg-white px-5 py-3.5 shadow-lg">
              <Avatar height="4.25rem" name={player.avatar} width="4.25rem" />
              <Text className="font-semibold">@{player.nickname}</Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
