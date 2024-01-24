import { nanoid } from "nanoid"
import { AuthTokenType, QuizType } from "@quizzy/common"
import { FastifyHandler, WithUserId } from "../types"
import { quizRepository } from "../database"

const createNewQuiz: FastifyHandler<
  WithUserId<AuthTokenType>,
  QuizType
> = async (req) => {
  const newQuiz: QuizType = {
    id: nanoid(5),
    name: "New Quiz",
    description: "Quiz Description",
    userRef: req.body.userId,
    picture: "",
    background: "",
    questions: [
      {
        name: "",
        picture: "",
        answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
        correctAnswers: [],
        timeLimit: 10,
        points: 1,
      },
    ],
    rating: 0,
    plays: 0,
  }

  await quizRepository.save(newQuiz)

  return newQuiz
}

const findQuiz: FastifyHandler<WithUserId, QuizType> = async (req, res) => {
  const { id } = req.params as { id: string }

  const quiz = await quizRepository.findOne({ where: { id } })

  if (!quiz) {
    return res.code(400).send({ message: "Quiz not found" })
  }

  return quiz
}

const findQuizForEdit: FastifyHandler<WithUserId, QuizType> = async (
  req,
  res
) => {
  const { id } = req.params as { id: string }

  const quiz = await quizRepository.findOne({ where: { id } })

  if (!quiz) {
    return res.code(400).send({ message: "Quiz not found" })
  }

  if (quiz.userRef !== req.body.userId) {
    return res.code(403).send({ message: "You are not the quiz creator" })
  }

  return quiz
}

const saveQuiz: FastifyHandler<WithUserId<{ quiz: QuizType }>> = async (
  req,
  res
) => {
  const { userId, quiz } = req.body

  if (userId !== quiz.userRef) {
    return res.code(403).send({ message: "You are not the quiz creator" })
  }

  await quizRepository.update({ id: quiz.id }, quiz)

  return { message: "success" }
}

export const QuizController = {
  createNewQuiz,
  findQuiz,
  findQuizForEdit,
  saveQuiz,
}
