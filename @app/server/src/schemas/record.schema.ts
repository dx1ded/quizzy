import { z } from "zod"
import { AuthToken, RecordSchema } from "@quizzy/common"
import { PageSchema } from "./quiz.schema"

export const RecordBodySchema = z.object({
  record: RecordSchema,
})

export const RecordIdWithAuthTokenSchema = z
  .object({
    id: z.string(),
  })
  .and(AuthToken)

export const RecordIdsWithAuthTokenSchema = z
  .object({
    ids: z.string().array(),
  })
  .and(AuthToken)

export const SearchRecordParamsSchema = RecordSchema.pick({
  quizName: true,
}).and(PageSchema)
