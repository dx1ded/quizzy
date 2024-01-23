import { z } from "zod"

export const QuestionSchema = z.object({
  name: z.string().min(1, "Question name is required"),
  background: z.string(),
  picture: z.string(),
  answers: z.string().array(),
  correctAnswers: z.number().array(),
  timeLimit: z.number(),
  points: z.number(),
})

export const QuizSchema = z.object({
  id: z.string(),
  userRef: z.number(),
  name: z.string().min(1, "Quiz name is required"),
  description: z.string().min(1, "Quiz description is required"),
  picture: z.string(),
  questions: QuestionSchema.array(),
  rating: z.number(),
  plays: z.number(),
})
