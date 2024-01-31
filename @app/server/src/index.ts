import "dotenv/config"
import fastify from "fastify"
import {
  validatorCompiler,
  serializerCompiler,
} from "fastify-type-provider-zod"
import { AuthRoute } from "./routes/AuthRoute"
import { QuizRoute } from "./routes/QuizRoute"

const server = fastify({
  // 200mb
  bodyLimit: 209715200,
})

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

await server.register(AuthRoute, { prefix: "/api/auth" })
await server.register(QuizRoute, { prefix: "/api/quiz" })

const PORT = Number(process.env.PORT)

server.listen({ port: PORT }, (err) => {
  if (err) console.log(err)
  console.log(`Server is listening port ${PORT}`)
})
