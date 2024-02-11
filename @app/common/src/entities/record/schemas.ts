import { z } from "zod"

export const RecordSchema = z.object({
  quizId: z.string(),
  quizName: z.string(),
  points: z.number(),
  date: z.number(),
  playersIds: z.number().array(),
})
