import { nanoid } from "nanoid"
import { In, Raw } from "typeorm"
import { z } from "zod"
import { GetRecordsType } from "@quizzy/common"
import { recordRepository, userRepository } from "../database"
import { PageSchema } from "../schemas/quiz.schema"
import {
  RecordIdsWithAuthTokenSchema,
  RecordIdWithAuthTokenSchema,
  RecordWithAuthTokenSchema,
  SearchRecordParamsSchema,
} from "../schemas/record.schema"
import { FastifyHandler, WithUserId } from "../types"

const listReport: FastifyHandler<{
  Body: WithUserId
  Reply: GetRecordsType
  Querystring: z.infer<typeof PageSchema>
}> = async (req) => {
  const { userId } = req.body
  const { perPage, page } = req.query

  const nPerPage = Number(perPage)
  const nPage = Number(page)
  const skip = nPerPage * nPage - nPerPage

  const records = await recordRepository.find({
    take: nPerPage,
    skip,
    where: [
      { userRef: userId },
      {
        playersIds: Raw((columnAlias) => `:userId = ANY(${columnAlias})`, {
          userId,
        }),
      },
    ],
  })

  const users = await userRepository.find({
    select: ["id", "username"],
    where: { id: In(records.map((record) => record.userRef)) },
  })

  // Make it consecutively
  const isCreator = records
    .map(({ userRef }) => users.find((user) => user.id === userRef)!)
    .map(({ id }) => id === userId)

  return {
    records,
    isCreator,
  }
}

const searchReport: FastifyHandler<{
  Body: WithUserId
  Reply: GetRecordsType
  Querystring: z.infer<typeof SearchRecordParamsSchema>
}> = async (req) => {
  const { userId } = req.body
  const { quizName, page, perPage } = req.query

  const nPerPage = Number(perPage)
  const nPage = Number(page)
  const skip = nPerPage * nPage - nPerPage

  const records = await recordRepository.find({
    take: nPerPage,
    skip,
    where: [
      {
        quizName: Raw(
          (alias) => `LOWER(${alias}) Like '${quizName.toLowerCase()}%'`
        ),
        userRef: userId,
      },
      {
        quizName: Raw(
          (alias) => `LOWER(${alias}) Like '${quizName.toLowerCase()}%'`
        ),
        playersIds: Raw((columnAlias) => `:userId = ANY(${columnAlias})`, {
          userId,
        }),
      },
    ],
  })

  const users = await userRepository.find({
    select: ["id", "username"],
    where: { id: In(records.map((record) => record.userRef)) },
  })

  // Make it consecutively
  const isCreator = records
    .map(({ userRef }) => users.find((user) => user.id === userRef)!)
    .map(({ id }) => id === userId)

  return {
    records,
    isCreator,
  }
}

const createReport: FastifyHandler<{
  Body: WithUserId<z.infer<typeof RecordWithAuthTokenSchema>>
}> = async (req) => {
  const { record, userId } = req.body

  const newRecord = {
    id: nanoid(5),
    ...record,
    userRef: userId,
  }

  await recordRepository.save(newRecord)

  return { message: "Success" }
}

const deleteReport: FastifyHandler<{
  Body: WithUserId<z.infer<typeof RecordIdWithAuthTokenSchema>>
}> = async (req, res) => {
  const { userId, id } = req.body

  const record = await recordRepository.findOne({
    where: { id },
  })

  if (!record || record.userRef !== userId) {
    return res.code(403).send("You are not the record creator")
  }

  await recordRepository.remove(record)

  return { message: "Success" }
}

const deleteReports: FastifyHandler<{
  Body: WithUserId<z.infer<typeof RecordIdsWithAuthTokenSchema>>
}> = async (req, res) => {
  const { userId, ids } = req.body

  const records = await recordRepository.find({
    where: { id: In(ids) },
  })
  const isCreator = records.every((record) => record.userRef === userId)

  if (!records || !isCreator) {
    return res.code(403).send("You are no the record creator")
  }

  await recordRepository.remove(records)

  return { message: "Success" }
}

export const RecordController = {
  listReport,
  searchReport,
  createReport,
  deleteReport,
  deleteReports,
}
