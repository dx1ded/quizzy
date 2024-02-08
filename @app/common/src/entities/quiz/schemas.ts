import { z } from "zod"

export const getQuestionSchema = (isPublished: boolean) =>
  z.object({
    name: isPublished ? z.string().min(1, "Question is required") : z.string(),
    picture: z.string(),
    background: z.string(),
    answers: isPublished
      ? z.string().min(1, "Answer is required").array()
      : z.string().array(),
    correctAnswers: isPublished
      ? z
          .boolean()
          .array()
          .refine(
            (arr) => arr.includes(true),
            "Should be at least one correct answer"
          )
      : z.boolean().array(),
    timeLimit: z.number(),
    points: z.number(),
  })

export const DraftQuizSchema = z.object({
  id: z.string(),
  userRef: z.number(),
  name: z.string().min(1, "Name is required"),
  description: z.string(),
  cover: z.string(),
  questions: getQuestionSchema(false).array(),
})

export const PublishedQuizSchema = z.object({
  id: z.string(),
  userRef: z.number(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  cover: z.string(),
  questions: getQuestionSchema(true).array(),
  rating: z.number(),
  plays: z.number(),
  favoriteBy: z.number().array(),
})
