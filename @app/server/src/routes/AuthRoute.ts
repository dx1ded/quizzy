import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { SignInSchema, SignInResponse } from "../types"
import { AuthController } from "../controllers/AuthController"

export const AuthRoute = async (f: FastifyInstance) => {
  f.withTypeProvider<ZodTypeProvider>().post(
    "/sign-in",
    {
      schema: {
        body: SignInSchema,
        response: { "2xx": SignInResponse },
      },
    },
    AuthController.signIn
  )
}
