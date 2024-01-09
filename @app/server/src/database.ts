import "reflect-metadata"
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { DataSource } from "typeorm"
import { User } from "./entities/User"

const dirnamePath = dirname(fileURLToPath(import.meta.url))

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

AppDataSource.initialize()
  .then(() => console.log("Connected to the DB!"))
  .catch(() => console.log("Error connecting to the DB!"))
