import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { PlayController } from "../controllers/PlayController"
import { PlaySessionQuerySchema } from "../schemas/play.schema"
import { QuizIdWithAuthTokenSchema } from "../schemas/quiz.schema"

export const PlayRoute = async (f: FastifyInstance) => {
  f.withTypeProvider<ZodTypeProvider>().post(
    "/create",
    {
      schema: {
        body: QuizIdWithAuthTokenSchema,
      },
    },
    PlayController.createPlaySession
  )

  f.withTypeProvider<ZodTypeProvider>().get(
    "/play",
    {
      websocket: true,
      schema: {
        querystring: PlaySessionQuerySchema,
      },
    },
    PlayController.play
  )
}
