import { Raw } from "typeorm"
import { nanoid } from "nanoid"
import {
  AuthTokenType,
  defaultQuiz,
  FindQuizType,
  ListQuizzesType,
  QuizType,
} from "@quizzy/common"
import { FastifyHandler, WithUserId } from "../types"
import { quizRepository, userRepository } from "../database"

const createNewQuiz: FastifyHandler<
  WithUserId<AuthTokenType>,
  QuizType
> = async (req) => {
  const newQuiz = defaultQuiz(nanoid(5), req.body.userId)

  await quizRepository.save(newQuiz)

  return newQuiz
}

const findQuiz: FastifyHandler<WithUserId, FindQuizType> = async (req, res) => {
  const { id } = req.params as { id: string }

  const quiz = await quizRepository.findOne({ where: { id } })

  if (!quiz) {
    return res.code(400).send({ message: "Quiz not found" })
  }

  const isCreator = req.body.userId === quiz.userRef
  const creatorInfo = await userRepository.findOne({
    where: { id: quiz.userRef },
    select: ["username"],
  })

  if (!creatorInfo) {
    return res.code(400).send({ message: "Quiz not found" })
  }

  return { quiz, isCreator, creatorInfo }
}

const findQuizForEdit: FastifyHandler<WithUserId, QuizType> = async (
  req,
  res
) => {
  const { id } = req.params as { id: string }

  const quiz = await quizRepository.findOne({ where: { id } })

  if (!quiz) {
    return res.code(404).send({ message: "Quiz not found" })
  }

  if (quiz.userRef !== req.body.userId) {
    return res.code(403).send({ message: "You are not the quiz creator" })
  }

  return quiz
}

const findQuizBy: FastifyHandler<unknown, QuizType[]> = async (req, res) => {
  const { name } = req.query as { name: string }

  if (!name) return res.code(404).send({ message: "Not Found!" })

  const quizzes = await quizRepository.find({
    select: ["name", "cover", "id", "plays", "rating"],
    where: {
      name: Raw((alias) => `LOWER(${alias}) Like '%${name.toLowerCase()}%'`),
    },
  })

  return quizzes
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

  return { message: "Success" }
}

const deleteQuiz: FastifyHandler<WithUserId<{ id: QuizType["id"] }>> = async (
  req,
  res
) => {
  const { id, userId } = req.body

  const quiz = await quizRepository.findOne({ where: { id } })

  if (!quiz || quiz.userRef !== userId) {
    return res.code(403).send("You are not the quiz creator")
  }

  await quizRepository.remove(quiz)

  return { message: "Success" }
}

const listQuizzes: FastifyHandler<
  WithUserId<{ page: number }>,
  QuizType[]
> = async (req) => {
  const { page } = req.body

  const perPage = 5
  const skip = perPage * page - perPage

  const quizzes = await quizRepository.find({
    take: perPage,
    skip,
  })

  return quizzes
}

const listOwnQuizzes: FastifyHandler<
  WithUserId<{ perPage: number; page: number }>,
  ListQuizzesType
> = async (req) => {
  const { perPage, page, userId } = req.body

  const skip = perPage * page - perPage

  const [quizzes, count] = await quizRepository.findAndCount({
    where: { userRef: userId },
    take: perPage,
    skip,
  })

  return { quizzes, count }
}

const listNewestQuizzes: FastifyHandler<unknown, QuizType[]> = async (
  _,
  res
) => {
  const quizzes = await quizRepository.find({
    order: { id: "DESC" },
    take: 4,
  })

  if (!quizzes) {
    return res.code(404).send({ message: "Quizzes not found" })
  }

  return quizzes
}

const listViralQuizzes: FastifyHandler<unknown, QuizType[]> = async (
  _,
  res
) => {
  const quizzes = await quizRepository.find({
    order: { plays: "DESC" },
    take: 4,
  })

  if (!quizzes) {
    return res.code(404).send({ message: "Quizzes not found" })
  }

  return quizzes
}

export const QuizController = {
  createNewQuiz,
  findQuiz,
  findQuizBy,
  findQuizForEdit,
  saveQuiz,
  deleteQuiz,
  listQuizzes,
  listOwnQuizzes,
  listNewestQuizzes,
  listViralQuizzes,
}
