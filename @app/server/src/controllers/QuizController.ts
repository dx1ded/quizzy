import { In, Raw } from "typeorm"
import { nanoid } from "nanoid"
import { z } from "zod"
import {
  defaultQuiz,
  GetQuizType,
  ListQuizzesType,
  QuizType,
  SearchQuizType,
  SearchQuizzesType,
} from "@quizzy/common"
import { PageSchema, SearchQuizParamsSchema } from "../schemas/quiz.schema"
import { FastifyHandler, WithUserId } from "../types"
import { quizRepository, userRepository } from "../database"

const createNewQuiz: FastifyHandler<{
  Body: WithUserId
  Reply: QuizType
}> = async (req) => {
  const newQuiz = defaultQuiz(nanoid(5), req.body.userId)

  await quizRepository.save(newQuiz)

  return newQuiz
}

const getQuiz: FastifyHandler<{
  Body: WithUserId
  Reply: GetQuizType
  Params: Pick<QuizType, "id">
}> = async (req, res) => {
  const { id } = req.params

  const quiz = await quizRepository.findOne({ where: { id } })

  if (!quiz) {
    return res.code(404).send({ message: "Quiz not found" })
  }

  const isCreator = req.body.userId === quiz.userRef
  const creatorInfo = await userRepository.findOne({
    where: { id: quiz.userRef },
    select: ["username"],
  })

  if (!creatorInfo) {
    return res.code(404).send({ message: "Creator not found" })
  }

  return { quiz, isCreator, creatorInfo }
}

const getQuizForEdit: FastifyHandler<{
  Body: WithUserId
  Reply: QuizType
  Params: Pick<QuizType, "id">
}> = async (req, res) => {
  const { id } = req.params

  const quiz = await quizRepository.findOne({ where: { id } })

  if (!quiz) {
    return res.code(404).send({ message: "Quiz not found" })
  }

  if (quiz.userRef !== req.body.userId) {
    return res.code(403).send({ message: "You are not the creator" })
  }

  return quiz
}

const searchQuizBy: FastifyHandler<{
  Body: WithUserId
  Reply: SearchQuizzesType
  Querystring: z.infer<typeof SearchQuizParamsSchema>
}> = async (req, res) => {
  const { name, perPage, page } = req.query

  const nPerPage = Number(perPage)
  const nPage = Number(page)

  const skip = nPerPage * nPage - nPerPage

  let quizzes: SearchQuizType[] = []

  if (name) {
    const result = await quizRepository.find({
      take: nPerPage,
      skip,
      select: [
        "id",
        "userRef",
        "name",
        "cover",
        "plays",
        "rating",
        "questions",
      ],
      where: {
        name: Raw((alias) => `LOWER(${alias}) Like '${name.toLowerCase()}%'`),
      },
    })

    quizzes = result.map((quiz) => ({
      ...quiz,
      questions: quiz.questions.length,
    })) as SearchQuizType[]
  }

  if (!quizzes.length) {
    return res.code(404).send({ message: "Quizzes not found" })
  }

  const creatorInfo = await userRepository.find({
    select: ["id", "username"],
    where: { id: In(quizzes.map((quiz) => quiz.userRef)) },
  })

  return { quizzes, creatorInfo }
}

const saveQuiz: FastifyHandler<{
  Body: WithUserId<{ quiz: QuizType }>
}> = async (req, res) => {
  const { userId, quiz } = req.body

  if (userId !== quiz.userRef) {
    return res.code(403).send({ message: "You are not the creator" })
  }

  await quizRepository.update({ id: quiz.id }, quiz)

  return { message: "Success" }
}

const deleteQuiz: FastifyHandler<{
  Body: WithUserId<{ id: QuizType["id"] }>
}> = async (req, res) => {
  const { id, userId } = req.body

  const quiz = await quizRepository.findOne({ where: { id } })

  if (!quiz || quiz.userRef !== userId) {
    return res.code(403).send("You are not the quiz creator")
  }

  await quizRepository.remove(quiz)

  return { message: "Success" }
}

const listQuizzes: FastifyHandler<{
  Body: WithUserId
  Reply: QuizType[]
  Querystring: z.infer<typeof PageSchema>
}> = async (req) => {
  const { page, perPage } = req.query

  const nPerPage = Number(perPage)
  const nPage = Number(page)

  const skip = nPerPage * nPage - nPerPage

  const quizzes = await quizRepository.find({
    take: nPerPage,
    skip,
  })

  return quizzes
}

const listOwnQuizzes: FastifyHandler<{
  Body: WithUserId
  Reply: ListQuizzesType
  Querystring: z.infer<typeof PageSchema>
}> = async (req, res) => {
  const { userId } = req.body
  const { page, perPage } = req.query

  const nPerPage = Number(perPage)
  const nPage = Number(page)

  const skip = nPerPage * nPage - nPerPage

  const [quizzes, count] = await quizRepository.findAndCount({
    where: { userRef: userId },
    take: nPerPage,
    skip,
  })

  if (!quizzes) {
    return res.code(404).send({ message: "Quizzes not found" })
  }

  return { quizzes, count }
}

const listNewestQuizzes: FastifyHandler<{
  Body: WithUserId
  Reply: QuizType[]
  Querystring: z.infer<typeof PageSchema>
}> = async (req, res) => {
  const { page, perPage } = req.query

  const nPerPage = Number(perPage)
  const nPage = Number(page)

  const skip = nPerPage * nPage - nPerPage

  const quizzes = await quizRepository.find({
    order: { id: "DESC" },
    take: nPerPage,
    skip,
  })

  if (!quizzes) {
    return res.code(404).send({ message: "Quizzes not found" })
  }

  return quizzes
}

const listViralQuizzes: FastifyHandler<{
  Body: WithUserId
  Reply: QuizType[]
  Querystring: z.infer<typeof PageSchema>
}> = async (req, res) => {
  const { page, perPage } = req.query

  const nPerPage = Number(perPage)
  const nPage = Number(page)

  const skip = nPerPage * nPage - nPerPage

  const quizzes = await quizRepository.find({
    order: { plays: "DESC" },
    take: nPerPage,
    skip,
  })

  if (!quizzes) {
    return res.code(404).send({ message: "Quizzes not found" })
  }

  return quizzes
}

export const QuizController = {
  createNewQuiz,
  getQuiz,
  getQuizForEdit,
  searchQuizBy,
  saveQuiz,
  deleteQuiz,
  listQuizzes,
  listOwnQuizzes,
  listNewestQuizzes,
  listViralQuizzes,
}
