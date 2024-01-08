import { z } from "zod"
import { FastifyHandler, SignInSchema, SignInResponse } from "../types"

const signIn: FastifyHandler<
  z.infer<typeof SignInSchema>,
  z.infer<typeof SignInResponse>
> = (req, _res) => {
  const { login } = req.body

  console.log(login)

  // res.send({ message: "123" })
  return { message: "132" }
}

export const AuthController = { signIn }
