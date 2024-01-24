import { z } from "zod"

export const QuestionSchema = z.object({
  name: z.string(),
  picture: z.string(),
  answers: z.string().array(),
  correctAnswers: z.boolean().array(),
  timeLimit: z.number(),
  points: z.number(),
})

export const QuizSchema = z.object({
  id: z.string(),
  userRef: z.number(),
  name: z.string(),
  description: z.string(),
  picture: z.string(),
  background: z.string(),
  questions: QuestionSchema.array(),
  rating: z.number(),
  plays: z.number(),
})
