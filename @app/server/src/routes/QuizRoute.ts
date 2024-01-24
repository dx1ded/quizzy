import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { AuthToken, AuthTokenType, QuizSchema, QuizType } from "@quizzy/common"
import { z } from "zod"
import { validateToken } from "../middleware"
import { QuizController } from "../controllers/QuizController"
import { WithUserId } from "../types"

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

  f.withTypeProvider<ZodTypeProvider>().post(
    "/:id",
    {
      preHandler: [validateToken],
      schema: {
        body: AuthToken,
      },
    },
    QuizController.findQuiz
  )

  f.withTypeProvider<ZodTypeProvider>().post(
    "/edit/:id",
    {
      preHandler: [validateToken],
      schema: {
        body: AuthToken,
      },
    },
    QuizController.findQuizForEdit
  )

  f.withTypeProvider<ZodTypeProvider>().post<{
    Body: WithUserId<AuthTokenType> & { quiz: QuizType }
  }>(
    "/save",
    {
      preHandler: [validateToken],
      schema: {
        body: z.object({ quiz: QuizSchema }).and(AuthToken),
      },
    },
    QuizController.saveQuiz
  )

  f.withTypeProvider<ZodTypeProvider>().post<{
    Body: WithUserId<AuthTokenType> & { page: number }
  }>(
    "/get",
    {
      preHandler: [validateToken],
      schema: {
        body: z.object({ page: z.number() }).and(AuthToken),
      },
    },
    QuizController.getQuizzes
  )

  f.withTypeProvider<ZodTypeProvider>().post<{
    Body: WithUserId<AuthTokenType> & { page: number }
  }>(
    "/getOwn",
    {
      preHandler: [validateToken],
      schema: {
        body: z.object({ page: z.number() }).and(AuthToken),
      },
    },
    QuizController.getOwnQuizzes
  )
}
