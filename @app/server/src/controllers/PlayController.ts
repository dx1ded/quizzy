import { QuizId, SessionToken } from "@quizzy/common"
import { customAlphabet } from "nanoid"
import { z } from "zod"
import { publishedQuizRepository } from "../database"
import { PlaySessionQuerySchema } from "../schemas/play.schema"
import { GameState } from "../state/GameState"
import {
  FastifyHandler,
  FastifyWebsocketHandler,
  PlaySessionMessage,
  WithUserId,
} from "../types"

const nanoid = customAlphabet("123456789", 7)

export const createPlaySession: FastifyHandler<{
  Body: WithUserId<QuizId>
  Reply: SessionToken
}> = async (req, res) => {
  const { userId, id } = req.body
  const token = +nanoid()

  const quiz = await publishedQuizRepository.findOne({ where: { id } })

  if (!quiz) {
    return res.code(404).send("Quiz not found")
  }

  new GameState({
    token,
    creatorId: userId,
    quizId: quiz.id,
    quizName: quiz.name,
    stage: "menu",
    players: [],
    activeQuestion: -1,
    questions: quiz.questions,
    answers: [],
    progressBar: 100,
  })

  return { token }
}

export const play: FastifyWebsocketHandler<{
  Querystring: z.infer<typeof PlaySessionQuerySchema>
}> = (connection, req) => {
  const { sessionToken, playerToken } = req.query

  const session = GameState.sessions.find(
    (session) => session.state.token === sessionToken
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

  connection.socket.on("open", (message: string) => {
    const response: PlaySessionMessage = JSON.parse(message.toString())

    if (response.type === "join") {
      if (session.state.stage !== "menu") {
        return connection.socket.send(JSON.stringify({ state: session.state }))
      }

      const playerToken = session.join(response.body)

      connection.socket.send(
        JSON.stringify({ state: session.state, playerToken })
      )
    }
  })

  connection.socket.on("message", (message) => {
    const response: PlaySessionMessage = JSON.parse(message.toString())

    if (response.type === "start") {
      session.start()

      connection.socket.send(JSON.stringify({ state: session.state }))
    } else if (response.type === "answer") {
      session.answer(response.body)

      connection.socket.send(JSON.stringify({ state: session.state }))
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
  play,
}
