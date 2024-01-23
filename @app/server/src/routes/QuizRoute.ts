import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { AuthToken } from "@quizzy/common"
import { validateToken } from "../middleware"
import { QuizController } from "../controllers/QuizController"

export const QuizRoute = async (f: FastifyInstance) => {
  f.withTypeProvider<ZodTypeProvider>().post(
    "/create/new",
    {
      preHandler: [validateToken],
      schema: {
        body: AuthToken,
      },
    },
    QuizController.createNewQuiz
  )
}
