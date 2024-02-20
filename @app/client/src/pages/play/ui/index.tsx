import { useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import useWebSocket from "react-use-websocket"
import { PlayResponse } from "@quizzy/common"
import { AccountState } from "entities/account"
import { NotFound } from "shared/ui/NotFound"
import type { AppStore } from "app/model"
import { PlayContextProvider } from "../model"

import { AnswerStage } from "./stages/AnswerStage"
import { ChooseAvatar } from "./stages/ChooseAvatar"
import { EndStage } from "./stages/EndStage"
import { GetReady } from "./stages/GetReady"
import { PlayersList } from "./stages/PlayersList"
import { QuestionResult } from "./stages/QuestionResult"
import { QuestionStage } from "./stages/QuestionStage"

export function Play() {
  const [searchParams] = useSearchParams()
  const [stage, setStage] = useState("")
  const [playerToken, setPlayerToken] = useState(
    localStorage.getItem("playerToken") || ""
  )
  const { id, nickname } = useSelector<AppStore, AccountState>(
    (state) => state.account
  )
  const { lastJsonMessage, sendJsonMessage } = useWebSocket<PlayResponse>(
    "ws://localhost:5000/api/play",
    {
      queryParams: {
        sessionId: searchParams.get("sessionId")!,
        playerToken,
      },
      onOpen() {
        sendJsonMessage({
          type: "join",
          body: {
            ...(id ? { id } : {}),
            nickname,
            avatar: "monkey",
          },
        })
      },
    }
  )

  useEffect(() => {
    if (lastJsonMessage?.state) {
      if (!stage) setPlayerToken(lastJsonMessage.playerToken)

      setStage(lastJsonMessage.state.stage)
      localStorage.setItem("playerToken", lastJsonMessage.playerToken)
    }
  }, [stage, playerToken, lastJsonMessage])

  const contextState = useMemo(
    () => ({
      ...lastJsonMessage,
      playerToken,
      sendJsonMessage,
    }),
    [lastJsonMessage, playerToken, sendJsonMessage]
  )

  return (
    <PlayContextProvider value={contextState}>
      {stage === "settings" ? (
        <ChooseAvatar />
      ) : stage === "menu" ? (
        playerToken ===
        lastJsonMessage.state.players.find(
          (player) => player.id === lastJsonMessage.state.creatorId
        )!.token ? (
          <PlayersList />
        ) : (
          <ChooseAvatar />
        )
      ) : stage === "start" ? (
        <GetReady />
      ) : stage === "question" ? (
        <QuestionStage />
      ) : stage === "answer" ? (
        <AnswerStage />
      ) : stage === "result" ? (
        <QuestionResult />
      ) : stage === "end" ? (
        <EndStage />
      ) : (
        <NotFound />
      )}
    </PlayContextProvider>
  )
}
