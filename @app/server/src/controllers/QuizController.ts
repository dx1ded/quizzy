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
    userRef: req.body.userId,
    picture: "",
    questions: [],
  }

  await quizRepository.save(newQuiz)

  return newQuiz
}

export const QuizController = {
  createNewQuiz,
}
