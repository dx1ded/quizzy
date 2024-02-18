import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { PlayController } from "../controllers/PlayController"
import { validateToken } from "../middleware/validateToken"
import {
  PlaySessionIdSchema,
  PlaySessionQuerySchema,
} from "../schemas/play.schema"
import { QuizIdWithAuthTokenSchema } from "../schemas/quiz.schema"

export const PlayRoute = async (f: FastifyInstance) => {
  f.withTypeProvider<ZodTypeProvider>().get(
    "/",
    {
      websocket: true,
      schema: {
        querystring: PlaySessionQuerySchema,
      },
    },
    PlayController.play
  )

  f.withTypeProvider<ZodTypeProvider>().post(
    "/create",
    {
      preHandler: [validateToken],
      schema: {
        body: QuizIdWithAuthTokenSchema,
      },
    },
    PlayController.createPlaySession
  )

  f.withTypeProvider<ZodTypeProvider>().post(
    "/exists",
    {
      schema: {
        body: PlaySessionIdSchema,
      },
    },
    PlayController.playSessionExists
  )
}
