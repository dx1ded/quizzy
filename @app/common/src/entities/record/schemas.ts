import { z } from "zod"

export const RecordSchema = z.object({
  quizId: z.string(),
  quizName: z.string(),
  userRef: z.number(),
  date: z.number(),
  result: z
    .object({
      id: z.number().optional(),
      nickname: z.string(),
      points: z.number(),
    })
    .array(),
})
