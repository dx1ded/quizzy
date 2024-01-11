import "dotenv/config"
import fastify from "fastify"
import {
  validatorCompiler,
  serializerCompiler,
} from "fastify-type-provider-zod"
import { AuthRoute } from "./routes/AuthRoute"

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

await server.register(AuthRoute, { prefix: "/api/auth" })

const PORT = Number(process.env.PORT)

server.listen({ port: PORT }, (err) => {
  if (err) console.log(err)
  console.log(`Server is listening port ${PORT}`)
})
