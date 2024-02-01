import { z } from "zod"

export const QuestionSchema = z.object({
  name: z.string().min(1, "Question is required"),
  picture: z.string(),
  background: z.string(),
  answers: z.string().min(1, "Answer is required").array(),
  correctAnswers: z
    .boolean()
    .array()
    .refine(
      (arr) => arr.includes(true),
      "Should be at least one correct answer"
    ),
  timeLimit: z.number(),
  points: z.number(),
})

export const QuizSchema = z.object({
  id: z.string(),
  userRef: z.number(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  cover: z.string(),
  questions: QuestionSchema.array(),
  rating: z.number(),
  plays: z.number(),
})
