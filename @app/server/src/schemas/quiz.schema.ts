import { z } from "zod"
import { AuthToken, DraftQuizSchema, PublishedQuizSchema } from "@quizzy/common"

export const QuizIdSchema = DraftQuizSchema.pick({ id: true })

export const PageSchema = z.object({
  page: z.string(),
  perPage: z.string(),
})

export const DraftQuizWithAuthTokenSchema = z
  .object({ quiz: DraftQuizSchema })
  .and(AuthToken)

export const QuizIdWithAuthTokenSchema = QuizIdSchema.and(AuthToken)

export const SetFavoriteQuizSchema = QuizIdSchema.and(AuthToken).and(
  z.object({
    favorite: z.boolean(),
  })
)

export const SearchQuizParamsSchema = PublishedQuizSchema.pick({ name: true })
  .and(PageSchema)
  .and(
    z.object({
      recent: z.string().optional(),
      drafts: z.string().optional(),
      favorites: z.string().optional(),
    })
  )
