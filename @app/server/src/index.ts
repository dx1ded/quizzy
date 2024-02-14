import "dotenv/config"
import fastify from "fastify"
import {
  validatorCompiler,
  serializerCompiler,
} from "fastify-type-provider-zod"
import fastifyWebsocket from "@fastify/websocket"
import { AuthRoute } from "./routes/AuthRoute"
import { PlayRoute } from "./routes/PlayRoute"
import { QuizRoute } from "./routes/QuizRoute"
import { RecordRoute } from "./routes/RecordRoute"

const server = fastify({
  // 200mb
  bodyLimit: 2097152000,
})

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

await server.register(fastifyWebsocket)
await server.register(AuthRoute, { prefix: "/api/auth" })
await server.register(QuizRoute, { prefix: "/api/quiz" })
await server.register(RecordRoute, { prefix: "/api/record" })
await server.register(PlayRoute, { prefix: "/api/play" })

const PORT = Number(process.env.PORT)

server.listen({ port: PORT }, (err) => {
  if (err) console.log(err)
  console.log(`Server is listening port ${PORT}`)
})
