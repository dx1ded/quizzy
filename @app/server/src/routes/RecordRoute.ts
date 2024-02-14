import { AuthToken } from "@quizzy/common"
import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { RecordController } from "../controllers/RecordController"
import { validateToken } from "../middleware/validateToken"
import { PageSchema } from "../schemas/quiz.schema"
import {
  RecordBodySchema,
  RecordIdsWithAuthTokenSchema,
  RecordIdWithAuthTokenSchema,
  SearchRecordParamsSchema,
} from "../schemas/record.schema"

export const RecordRoute = async (f: FastifyInstance) => {
  f.withTypeProvider<ZodTypeProvider>().post(
    "/list",
    {
      preHandler: [validateToken],
      schema: {
        body: AuthToken,
        querystring: PageSchema,
      },
    },
    RecordController.listReport
  )

  f.withTypeProvider<ZodTypeProvider>().post(
    "/search",
    {
      preHandler: [validateToken],
      schema: {
        body: AuthToken,
        querystring: SearchRecordParamsSchema,
      },
    },
    RecordController.searchReport
  )

  f.withTypeProvider<ZodTypeProvider>().put(
    "/create",
    {
      schema: {
        body: RecordBodySchema,
      },
    },
    RecordController.createReport
  )

  f.withTypeProvider<ZodTypeProvider>().delete(
    "/delete",
    {
      preHandler: [validateToken],
      schema: {
        body: RecordIdWithAuthTokenSchema,
      },
    },
    RecordController.deleteReport
  )

  f.withTypeProvider<ZodTypeProvider>().delete(
    "/deleteMany",
    {
      preHandler: [validateToken],
      schema: {
        body: RecordIdsWithAuthTokenSchema,
      },
    },
    RecordController.deleteReports
  )
}
