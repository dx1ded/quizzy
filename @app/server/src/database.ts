import "reflect-metadata"
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { DataSource } from "typeorm"
import { Record } from "./entities/Record"
import { User } from "./entities/User"
import { DraftQuiz } from "./entities/DraftQuiz"
import { PublishedQuiz } from "./entities/PublishedQuiz"

const dirnamePath = dirname(fileURLToPath(import.meta.url))

console.log(process.env)

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [`${dirnamePath}/entities/**/*.{js,ts}`],
})

export const userRepository = AppDataSource.getRepository(User)
export const draftQuizRepository = AppDataSource.getRepository(DraftQuiz)
export const recordRepository = AppDataSource.getRepository(Record)

export const publishedQuizRepository =
  AppDataSource.getRepository(PublishedQuiz)

AppDataSource.initialize()
  .then(() => console.log("Connected to the DB"))
  .catch((e) => console.log("Error connecting to the DB", e))
