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
import { ref, uploadString } from "firebase/storage"
import {
  draftQuizRepository,
  publishedQuizRepository,
  recordRepository,
  userRepository,
} from "../database"
import {
  PageSchema,
  QuizIdsWithAuthTokenSchema,
  SearchQuizParamsSchema,
  SetFavoriteQuizSchema,
} from "../schemas/quiz.schema"
import { FastifyHandler, WithUserId } from "../types"
import { storage } from "../admin"

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
    select: ["username", "picture"],
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

const searchQuiz: FastifyHandler<{
  Body: WithUserId
  Reply: SearchQuizzesType
  Querystring: z.infer<typeof SearchQuizParamsSchema>
}> = async (req) => {
  const { name, perPage, page } = req.query

  const nPerPage = Number(perPage)
  const nPage = Number(page)
  const skip = nPerPage * nPage - nPerPage

  const result = await publishedQuizRepository.find({
    take: nPerPage,
    skip,
    where: {
      name: Raw((alias) => `LOWER(${alias}) Like '${name.toLowerCase()}%'`),
    },
    select: ["id", "userRef", "name", "cover", "plays", "rating", "questions"],
  })

  const quizzes = result.map((quiz) => ({
    ...quiz,
    questions: quiz.questions.length,
  })) as SearchQuizType[]

  const users = await userRepository.find({
    select: ["id", "username", "picture"],
    where: { id: In(quizzes.map((quiz) => quiz.userRef)) },
  })

  // Make it consecutively
  const creatorInfo = result.map(
    ({ userRef }) => users.find((user) => user.id === userRef)!
  )

  const isCreator = users.map((user, i) => user.id === quizzes[i].userRef)

  return { quizzes, creatorInfo, isCreator }
}

const searchDraftQuiz: FastifyHandler<{
  Body: WithUserId
  Reply: SearchQuizzesType
  Querystring: z.infer<typeof PageSchema>
}> = async (req) => {
  const { perPage, page } = req.query

  const nPerPage = Number(perPage)
  const nPage = Number(page)
  const skip = nPerPage * nPage - nPerPage

  const result = await draftQuizRepository.find({
    take: nPerPage,
    skip,
    select: ["id", "userRef", "name", "cover", "questions"],
  })

  const quizzes = result.map((quiz) => ({
    ...quiz,
    questions: quiz.questions.length,
  })) as SearchQuizType[]

  const users = await userRepository.find({
    select: ["id", "username", "picture"],
    where: { id: In(quizzes.map((quiz) => quiz.userRef)) },
  })

  // Make it consecutively
  const creatorInfo = result.map(
    ({ userRef }) => users.find((user) => user.id === userRef)!
  )

  const isCreator = users.map((user, i) => user.id === quizzes[i].userRef)

  return { quizzes, creatorInfo, isCreator }
}

const searchRecentQuiz: FastifyHandler<{
  Body: WithUserId
  Reply: SearchQuizzesType
  Querystring: z.infer<typeof PageSchema>
}> = async (req) => {
  const { perPage, page } = req.query

  const nPerPage = Number(perPage)
  const nPage = Number(page)
  const skip = nPerPage * nPage - nPerPage

  const recent = await recordRepository.find({
    take: nPerPage,
    skip,
  })

  const result = await publishedQuizRepository.find({
    select: ["id", "userRef", "name", "cover", "plays", "rating", "questions"],
    where: { id: In(recent.map(({ quizId }) => quizId)) },
  })

  const quizzes = result.map((quiz) => ({
    ...quiz,
    questions: quiz.questions.length,
  })) as SearchQuizType[]

  const users = await userRepository.find({
    select: ["id", "username", "picture"],
    where: { id: In(quizzes.map((quiz) => quiz.userRef)) },
  })

  // Make it consecutively
  const creatorInfo = result.map(
    ({ userRef }) => users.find((user) => user.id === userRef)!
  )

  const isCreator = users.map((user, i) => user.id === quizzes[i].userRef)

  return { quizzes, creatorInfo, isCreator }
}

const searchFavoriteQuiz: FastifyHandler<{
  Body: WithUserId
  Reply: SearchQuizzesType
  Querystring: z.infer<typeof PageSchema>
}> = async (req) => {
  const { userId } = req.body
  const { perPage, page } = req.query

  const nPerPage = Number(perPage)
  const nPage = Number(page)
  const skip = nPerPage * nPage - nPerPage

  const result = await publishedQuizRepository
    .createQueryBuilder("quiz")
    .take(nPerPage)
    .skip(skip)
    .where(":userId = ANY(quiz.favoriteBy)", { userId })
    .select([
      "quiz.id",
      "quiz.userRef",
      "quiz.name",
      "quiz.cover",
      "quiz.plays",
      "quiz.rating",
      "quiz.questions",
    ])
    .getMany()

  const quizzes = result.map((quiz) => ({
    ...quiz,
    questions: quiz.questions.length,
  })) as SearchQuizType[]

  const users = await userRepository.find({
    select: ["id", "username", "picture"],
    where: { id: In(quizzes.map((quiz) => quiz.userRef)) },
  })

  // Make it consecutively
  const creatorInfo = result.map(
    ({ userRef }) => users.find((user) => user.id === userRef)!
  )

  const isCreator = users.map((user, i) => user.id === quizzes[i].userRef)

  return { quizzes, creatorInfo, isCreator }
}

const saveQuiz: FastifyHandler<{
  Body: WithUserId<{ quiz: DraftQuizType }>
}> = async (req, res) => {
  const { userId, quiz } = req.body

  if (userId !== quiz.userRef) {
    return res.code(403).send({ message: "You are not the creator" })
  }

  const cover = await uploadString(
    ref(storage, `quizzes/${quiz.id}/cover.jpg`),
    quiz.cover,
    "base64"
  )
  console.log(cover)
  // const pictures = quiz.questions.map((_, i) =>
  //   ref(storage, `quizzes/${quiz.id}/pictures/${i}.jpg`)
  // )
  // const backgrounds = quiz.questions.map((_, i) =>
  //   ref(storage, `quizzes/${quiz.id}/backgrounds/${i}.jpg`)
  // )

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

const deleteQuizzes: FastifyHandler<{
  Body: WithUserId<z.infer<typeof QuizIdsWithAuthTokenSchema>>
}> = async (req, res) => {
  const { ids, userId } = req.body

  const quizzes = await draftQuizRepository.find({ where: { id: In(ids) } })
  const isCreator = quizzes.every((quiz) => quiz.userRef === userId)

  if (!quizzes || !isCreator) {
    return res.code(403).send("You are not the quiz creator")
  }

  await draftQuizRepository.remove(quizzes)

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
  searchQuiz,
  searchDraftQuiz,
  searchFavoriteQuiz,
  searchRecentQuiz,
  saveQuiz,
  publishQuiz,
  unpublishQuiz,
  deleteQuiz,
  deleteQuizzes,
  setQuizFavorite,
  listQuizzes,
  listOwnQuizzes,
  listNewestQuizzes,
  listViralQuizzes,
}
