import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { AuthToken } from "@quizzy/common"
import { validateToken } from "../middleware/validateToken"
import { QuizController } from "../controllers/QuizController"
import {
  PageSchema,
  QuizIdSchema,
  QuizIdWithAuthTokenSchema,
  QuizWithAuthTokenSchema,
  SearchQuizParamsSchema,
  SetFavoriteQuizSchema,
} from "../schemas/quiz.schema"

export const QuizRoute = async (f: FastifyInstance) => {
  f.withTypeProvider<ZodTypeProvider>().put(
    "/create",
    {
      preHandler: [validateToken],
      schema: {
        body: AuthToken,
      },
    },
    QuizController.createNewQuiz
  )

  f.withTypeProvider<ZodTypeProvider>().post(
    "/get/:id",
    {
      preHandler: [validateToken],
      schema: {
        body: AuthToken,
        params: QuizIdSchema,
      },
    },
    QuizController.getQuiz
  )

  f.withTypeProvider<ZodTypeProvider>().post(
    "/getForEdit/:id",
    {
      preHandler: [validateToken],
      schema: {
        body: AuthToken,
        params: QuizIdSchema,
      },
    },
    QuizController.getQuizForEdit
  )

  f.withTypeProvider<ZodTypeProvider>().post(
    "/searchBy",
    {
      preHandler: [validateToken],
      schema: {
        body: AuthToken,
        querystring: SearchQuizParamsSchema,
      },
    },
    QuizController.searchQuizBy
  )

  f.withTypeProvider<ZodTypeProvider>().patch(
    "/save",
    {
      preHandler: [validateToken],
      schema: {
        body: QuizWithAuthTokenSchema,
      },
    },
    QuizController.saveQuiz
  )

  f.withTypeProvider<ZodTypeProvider>().delete(
    "/delete",
    {
      preHandler: [validateToken],
      schema: {
        body: QuizIdWithAuthTokenSchema,
      },
    },
    QuizController.deleteQuiz
  )

  f.withTypeProvider<ZodTypeProvider>().patch(
    "/set-favorite",
    {
      preHandler: [validateToken],
      schema: {
        body: SetFavoriteQuizSchema,
      },
    },
    QuizController.setQuizFavorite
  )

  f.withTypeProvider<ZodTypeProvider>().post(
    "/list",
    {
      preHandler: [validateToken],
      schema: {
        body: AuthToken,
        querystring: PageSchema,
      },
    },
    QuizController.listQuizzes
  )

  f.withTypeProvider<ZodTypeProvider>().post(
    "/list/own",
    {
      preHandler: [validateToken],
      schema: {
        body: AuthToken,
        querystring: PageSchema,
      },
    },
    QuizController.listOwnQuizzes
  )

  f.withTypeProvider<ZodTypeProvider>().post(
    "/list/newest",
    {
      preHandler: [validateToken],
      schema: {
        body: AuthToken,
        querystring: PageSchema,
      },
    },
    QuizController.listNewestQuizzes
  )

  f.withTypeProvider<ZodTypeProvider>().post(
    "/list/viral",
    {
      preHandler: [validateToken],
      schema: {
        body: AuthToken,
        querystring: PageSchema,
      },
    },
    QuizController.listViralQuizzes
  )
}
