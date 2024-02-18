import { createContext, PropsWithChildren } from "react"
import { SendJsonMessage } from "react-use-websocket/dist/lib/types"
import { PlayResponse } from "@quizzy/common"

type PlayContextType = PlayResponse & {
  sendJsonMessage: SendJsonMessage
}

const initialState: PlayContextType = {
  state: {
    sessionId: "",
    creatorId: -1,
    quizId: "",
    quizName: "",
    stage: "settings",
    players: [],
    activeQuestion: -1,
    questions: [],
    answers: [],
    progressBar: 0,
  },
  playerToken: "",
  sendJsonMessage() {},
}

export const PlayContext = createContext(initialState)

export function PlayContextProvider({
  value,
  children,
}: PropsWithChildren<{ value: PlayContextType }>) {
  return <PlayContext.Provider value={value}>{children}</PlayContext.Provider>
}
