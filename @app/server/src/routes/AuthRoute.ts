import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import {
  AuthToken,
  Credentials,
  SignInSchema,
  SignUpSchema,
  UsernameSchema,
} from "@quizzy/common"
import { AuthController } from "../controllers/AuthController"
import { validateToken } from "../middleware/validateToken"

export const AuthRoute = async (f: FastifyInstance) => {
  f.withTypeProvider<ZodTypeProvider>().post(
    "/sign-in",
    {
      schema: {
        body: SignInSchema,
      },
    },
    AuthController.signIn
  )

  f.withTypeProvider<ZodTypeProvider>().post(
    "/sign-up",
    {
      schema: {
        body: SignUpSchema,
      },
    },
    AuthController.signUp
  )

  f.withTypeProvider<ZodTypeProvider>().post(
    "/check-email",
    {
      schema: {
        body: Credentials.pick({ email: true }),
      },
    },
    AuthController.checkEmailAvailability
  )

  f.withTypeProvider<ZodTypeProvider>().post(
    "/check-username",
    {
      schema: {
        body: UsernameSchema,
      },
    },
    AuthController.checkUsernameAvailability
  )

  f.withTypeProvider<ZodTypeProvider>().post(
    "/check-token",
    {
      schema: {
        body: AuthToken,
      },
    },
    AuthController.checkTokenValidity
  )

  f.withTypeProvider<ZodTypeProvider>().post(
    "/get-info",
    {
      preHandler: [validateToken],
      schema: {
        body: AuthToken,
      },
    },
    AuthController.getAccountInfo
  )
}
