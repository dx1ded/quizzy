import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { AuthToken } from "@quizzy/common"
import { validateToken } from "../middleware/validateToken"
import { QuizController } from "../controllers/QuizController"
import {
  DraftQuizWithAuthTokenSchema,
  PageSchema,
  QuizIdSchema,
  QuizIdsWithAuthTokenSchema,
  QuizIdWithAuthTokenSchema,
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
    "/search",
    {
      preHandler: [validateToken],
      schema: {
        body: AuthToken,
        querystring: SearchQuizParamsSchema,
      },
    },
    QuizController.searchQuiz
  )

  f.withTypeProvider<ZodTypeProvider>().post(
    "/search/draft",
    {
      preHandler: [validateToken],
      schema: {
        body: AuthToken,
        querystring: PageSchema,
      },
    },
    QuizController.searchDraftQuiz
  )

  f.withTypeProvider<ZodTypeProvider>().post(
    "/search/favorite",
    {
      preHandler: [validateToken],
      schema: {
        body: AuthToken,
        querystring: PageSchema,
      },
    },
    QuizController.searchFavoriteQuiz
  )

  f.withTypeProvider<ZodTypeProvider>().post(
    "/search/recent",
    {
      preHandler: [validateToken],
      schema: {
        body: AuthToken,
        querystring: PageSchema,
      },
    },
    QuizController.searchRecentQuiz
  )

  f.withTypeProvider<ZodTypeProvider>().patch(
    "/save",
    {
      preHandler: [validateToken],
      schema: {
        body: DraftQuizWithAuthTokenSchema,
      },
    },
    QuizController.saveQuiz
  )

  f.withTypeProvider<ZodTypeProvider>().put(
    "/publish",
    {
      preHandler: [validateToken],
      schema: {
        body: QuizIdWithAuthTokenSchema,
      },
    },
    QuizController.publishQuiz
  )

  f.withTypeProvider<ZodTypeProvider>().put(
    "/unpublish",
    {
      preHandler: [validateToken],
      schema: {
        body: QuizIdWithAuthTokenSchema,
      },
    },
    QuizController.unpublishQuiz
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

  f.withTypeProvider<ZodTypeProvider>().delete(
    "/deleteMany",
    {
      preHandler: [validateToken],
      schema: {
        body: QuizIdsWithAuthTokenSchema,
      },
    },
    QuizController.deleteQuizzes
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
