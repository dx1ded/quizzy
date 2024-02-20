import { z } from "zod"
import { CreateGameResponse, QuizId } from "@quizzy/common"
import { server } from "../index"
import { publishedQuizRepository, userRepository } from "../database"
import {
  PlaySessionIdSchema,
  PlaySessionQuerySchema,
} from "../schemas/play.schema"
import { GameState } from "../state/GameState"
import {
  FastifyHandler,
  FastifyWebsocketHandler,
  PlaySessionMessage,
  WithUserId,
} from "../types"
import { generateNumberedId } from "../utils"

function broadcast(message: string) {
  server.websocketServer.clients.forEach((client) => client.send(message))
}

GameState.broadcast = broadcast

export const createPlaySession: FastifyHandler<{
  Body: WithUserId<QuizId>
  Reply: CreateGameResponse
}> = async (req, res) => {
  const { userId, id } = req.body
  const sessionId = generateNumberedId()

  const quiz = await publishedQuizRepository.findOne({ where: { id } })
  const user = await userRepository.findOne({ where: { id: userId } })

  if (!quiz || !user) {
    return res.code(404).send("Quiz not found")
  }

  const gs = new GameState({
    sessionId,
    creatorId: userId,
    quizId: quiz.id,
    quizName: quiz.name,
    stage: "settings",
    players: [],
    activeQuestion: -1,
    questions: quiz.questions,
    answers: [],
    progressBar: 0,
  })

  const playerToken = gs.join({
    id: userId,
    nickname: user.username,
    avatar: "monkey",
  })

  return { sessionId, playerToken }
}

export const playSessionExists: FastifyHandler<{
  Body: z.infer<typeof PlaySessionIdSchema>
  Reply: boolean
}> = (req) => {
  const { sessionId } = req.body

  return GameState.sessions.some(
    (session) => session.state.sessionId === sessionId
  )
}

export const play: FastifyWebsocketHandler<{
  Querystring: z.infer<typeof PlaySessionQuerySchema>
}> = (connection, req) => {
  const { sessionId, playerToken } = req.query

  const session = GameState.sessions.find(
    (session) => session.state.sessionId === sessionId
  )

  if (!session) {
    return connection.socket.close(404, "Session doesn't exist")
  }

  if (
    session.state.stage !== "menu" &&
    !session.state.players.some((player) => player.token === playerToken)
  ) {
    return connection.socket.close(403, "You aren't one of the players")
  }

  connection.socket.on("message", (message) => {
    const response: PlaySessionMessage = JSON.parse(message.toString())

    if (response.type === "join") {
      const activePlayer = session.state.players.find(
        (player) => player.token === playerToken
      )

      if (activePlayer) {
        return connection.socket.send(
          JSON.stringify({
            state: session.state,
            playerToken: activePlayer.token,
          })
        )
      }

      const newPlayerToken = session.join(response.body)

      broadcast(
        JSON.stringify({ state: session.state, playerToken: newPlayerToken })
      )
    } else if (response.type === "menu") {
      session.menu()

      broadcast(JSON.stringify({ state: session.state }))
    } else if (response.type === "start") {
      session.start()

      broadcast(JSON.stringify({ state: session.state }))
    } else if (response.type === "answer") {
      session.answer(response.body)

      broadcast(JSON.stringify({ state: session.state }))
    } else if (response.type === "change_avatar") {
      session.changeAvatar(response.body)

      broadcast(JSON.stringify({ state: session.state }))
    }
  })

  connection.socket.on("close", (message) => {
    const response: PlaySessionMessage = JSON.parse(message.toString())

    if (response.type === "leave") {
      session.leave(response.body)
    }
  })
}

export const PlayController = {
  createPlaySession,
  playSessionExists,
  play,
}
