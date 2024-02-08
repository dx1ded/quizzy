import {
  defaultQuiz,
  DraftQuizType,
  GetQuizForEditType,
  GetQuizType,
  ListQuizzesType,
  PublishedQuizType,
  QuizId,
  SearchQuizType,
  SearchQuizzesType,
} from "@quizzy/common"
import _ from "lodash"
import { nanoid } from "nanoid"
import { In, Raw } from "typeorm"
import { z } from "zod"
import {
  draftQuizRepository,
  publishedQuizRepository,
  userRepository,
} from "../database"
import {
  PageSchema,
  SearchQuizParamsSchema,
  SetFavoriteQuizSchema,
} from "../schemas/quiz.schema"
import { FastifyHandler, WithUserId } from "../types"

const createNewQuiz: FastifyHandler<{
  Body: WithUserId
  Reply: DraftQuizType
}> = async (req) => {
  const newQuiz = defaultQuiz(nanoid(5), req.body.userId)

  await draftQuizRepository.save(newQuiz)

  return newQuiz
}

const getQuiz: FastifyHandler<{
  Body: WithUserId
  Reply: GetQuizType
  Params: QuizId
}> = async (req, res) => {
  const { userId } = req.body
  const { id } = req.params

  const quiz = await publishedQuizRepository.findOne({ where: { id } })

  if (!quiz) {
    return res.code(404).send({ message: "Quiz not found" })
  }

  const isCreator = userId === quiz.userRef
  const isFavorite = quiz.favoriteBy.includes(userId)

  const creatorInfo = await userRepository.findOne({
    where: { id: quiz.userRef },
    select: ["username"],
  })

  if (!creatorInfo) {
    return res.code(404).send({ message: "Creator not found" })
  }

  return { quiz, isCreator, isFavorite, creatorInfo }
}

const getQuizForEdit: FastifyHandler<{
  Body: WithUserId
  Reply: GetQuizForEditType
  Params: QuizId
}> = async (req, res) => {
  const { id } = req.params

  let quiz: DraftQuizType | null
  let isPublished = false

  const draftQuiz = await draftQuizRepository.findOne({ where: { id } })
  quiz = draftQuiz

  if (!draftQuiz) {
    quiz = await publishedQuizRepository.findOne({
      where: { id },
    })
    isPublished = true
  }

  if (!quiz) {
    return res.code(404).send({ message: "Quiz not found" })
  }

  if (quiz.userRef !== req.body.userId) {
    return res.code(403).send({ message: "You are not the creator" })
  }

  return { quiz, isPublished }
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
    const result = await publishedQuizRepository.find({
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
  Body: WithUserId<{ quiz: DraftQuizType }>
}> = async (req, res) => {
  const { userId, quiz } = req.body

  if (userId !== quiz.userRef) {
    return res.code(403).send({ message: "You are not the creator" })
  }

  await draftQuizRepository.update({ id: quiz.id }, quiz)

  return { message: "Success" }
}

const publishQuiz: FastifyHandler<{
  Body: WithUserId<QuizId>
}> = async (req, res) => {
  const { userId, id } = req.body

  const draftQuiz = await draftQuizRepository.findOne({ where: { id } })

  if (!draftQuiz) {
    return res.code(404).send({ message: "Not found" })
  }

  if (draftQuiz.userRef !== userId) {
    return res.code(403).send({ message: "You are not the creator" })
  }

  const quizToPublish: PublishedQuizType = {
    ...draftQuiz,
    rating: 0,
    plays: 0,
    favoriteBy: [],
  }

  await draftQuizRepository.remove(draftQuiz)
  await publishedQuizRepository.save(quizToPublish)

  return { message: "Success" }
}

const unpublishQuiz: FastifyHandler<{
  Body: WithUserId<QuizId>
}> = async (req, res) => {
  const { userId, id } = req.body

  const publishedQuiz = await publishedQuizRepository.findOne({ where: { id } })

  if (!publishedQuiz) {
    return res.code(404).send({ message: "Not found" })
  }

  if (publishedQuiz.userRef !== userId) {
    return res.code(403).send({ message: "You are not the creator" })
  }

  const draftQuiz: DraftQuizType = _.omit(publishedQuiz, [
    "rating",
    "plays",
    "favoriteBy",
  ])

  await publishedQuizRepository.remove(publishedQuiz)
  await draftQuizRepository.save(draftQuiz)

  return { message: "Success" }
}

const deleteQuiz: FastifyHandler<{
  Body: WithUserId<QuizId>
}> = async (req, res) => {
  const { id, userId } = req.body

  const quiz = await draftQuizRepository.findOne({ where: { id } })

  if (!quiz || quiz.userRef !== userId) {
    return res.code(403).send("You are not the quiz creator")
  }

  await draftQuizRepository.remove(quiz)

  return { message: "Success" }
}

const setQuizFavorite: FastifyHandler<{
  Body: WithUserId<z.infer<typeof SetFavoriteQuizSchema>>
}> = async (req, res) => {
  const { id, userId, favorite } = req.body

  const quiz = await publishedQuizRepository.findOne({ where: { id } })

  if (!quiz) {
    return res.code(404).send("Quiz not found")
  }

  if (favorite) {
    quiz.rating += 1
    quiz.favoriteBy = [...quiz.favoriteBy, userId]
  } else {
    quiz.rating -= 1
    quiz.favoriteBy = quiz.favoriteBy.filter((_id) => _id !== userId)
  }

  await publishedQuizRepository.update({ id }, quiz)

  return { message: "Success" }
}

const listQuizzes: FastifyHandler<{
  Body: WithUserId
  Reply: PublishedQuizType[]
  Querystring: z.infer<typeof PageSchema>
}> = async (req) => {
  const { page, perPage } = req.query

  const nPerPage = Number(perPage)
  const nPage = Number(page)

  const skip = nPerPage * nPage - nPerPage

  const quizzes = await publishedQuizRepository.find({
    select: ["id", "cover", "name", "description"],
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

  const [quizzes, count] = await publishedQuizRepository.findAndCount({
    select: ["id", "cover", "name", "plays"],
    where: { userRef: userId },
    take: nPerPage,
    skip,
  })

  if (!quizzes) {
    return res.code(404).send({ message: "Quizzes not found" })
  }

  return {
    quizzes,
    count: count < nPerPage ? count - quizzes.length : count - nPerPage,
  }
}

const listNewestQuizzes: FastifyHandler<{
  Body: WithUserId
  Reply: PublishedQuizType[]
  Querystring: z.infer<typeof PageSchema>
}> = async (req, res) => {
  const { page, perPage } = req.query

  const nPerPage = Number(perPage)
  const nPage = Number(page)

  const skip = nPerPage * nPage - nPerPage

  const quizzes = await publishedQuizRepository.find({
    select: ["id", "cover"],
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
  Reply: PublishedQuizType[]
  Querystring: z.infer<typeof PageSchema>
}> = async (req, res) => {
  const { page, perPage } = req.query

  const nPerPage = Number(perPage)
  const nPage = Number(page)

  const skip = nPerPage * nPage - nPerPage

  const quizzes = await publishedQuizRepository.find({
    select: ["id", "cover"],
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
  publishQuiz,
  unpublishQuiz,
  deleteQuiz,
  setQuizFavorite,
  listQuizzes,
  listOwnQuizzes,
  listNewestQuizzes,
  listViralQuizzes,
}
