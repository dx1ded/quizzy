import { z } from "zod"
import { nanoid } from "nanoid"
import { AuthToken, QuizSchema } from "@quizzy/common"
import { FastifyHandler, WithUserId } from "../types"
import { quizRepository } from "../database"

type QuizType = z.infer<typeof QuizSchema>

const createNewQuiz: FastifyHandler<
  WithUserId<z.infer<typeof AuthToken>>,
  QuizType
> = async (req) => {
  const newQuiz: QuizType = {
    id: nanoid(5),
    name: "New Quiz",
    description: "Quiz Description",
    userRef: req.body.userId,
    picture: "",
    questions: [],
    rating: 0,
    plays: 0,
  }

  await quizRepository.save(newQuiz)

  return newQuiz
}

export const QuizController = {
  createNewQuiz,
}
