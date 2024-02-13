import { z } from "zod"
import {
  getQuestionSchema,
  DraftQuizSchema,
  PublishedQuizSchema,
} from "./schemas"

const QuestionSchema = getQuestionSchema(false)

export type DraftQuizType = z.infer<typeof DraftQuizSchema>
export type PublishedQuizType = z.infer<typeof PublishedQuizSchema>

export type QuizId = Pick<PublishedQuizType, "id">
export type QuestionType = z.infer<typeof QuestionSchema>

export type SearchQuizType = PublishedQuizType & {
  questions: number
}

export type GetQuizType = {
  quiz: PublishedQuizType
  creatorInfo: { username: string; picture: string }
  isCreator: boolean
  isFavorite: boolean
}

export type GetQuizForEditType = {
  quiz: DraftQuizType
  isPublished: boolean
}

export type ListQuizzesType = {
  quizzes: PublishedQuizType[]
  count: number
}

export type SearchQuizzesType = {
  quizzes: SearchQuizType[]
  creatorInfo: {
    id: number
    username: string
    picture: string
  }[]
  isCreator: boolean[]
}
