import { z } from "zod"
import { AuthToken, QuizSchema } from "@quizzy/common"

export const QuizIdSchema = QuizSchema.pick({ id: true })

export const PageSchema = z.object({
  page: z.string(),
  perPage: z.string(),
})

export const QuizWithAuthTokenSchema = z
  .object({ quiz: QuizSchema })
  .and(AuthToken)

export const QuizIdWithAuthTokenSchema = QuizIdSchema.and(AuthToken)

export const SetFavoriteQuizSchema = QuizIdSchema.and(AuthToken).and(
  z.object({
    favorite: z.boolean(),
  })
)

export const SearchQuizParamsSchema = QuizSchema.pick({ name: true })
  .and(PageSchema)
  .and(
    z.object({
      recent: z.string().optional(),
      drafts: z.string().optional(),
      favorites: z.string().optional(),
    })
  )
