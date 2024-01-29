import { z } from "zod"
import { QuestionSchema, QuizSchema } from "./schemas"

export type QuizType = z.infer<typeof QuizSchema>
export type QuestionType = z.infer<typeof QuestionSchema>

export type FindQuizType = {
  quiz: QuizType
  creatorInfo: { username: string }
  isCreator: boolean
}

export type ListQuizzesType = {
  quizzes: QuizType[]
  count: number
}
