import { z } from "zod"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {
  SignInSchema,
  SignUpSchema,
  AuthTokenType,
  CredentialsSchema,
  UsernameSchema,
  FieldAvailability,
} from "@quizzy/common"
import { User } from "../entities/User"
import { userRepository } from "../database"
import { FastifyHandler } from "../types"
import { emailRegexp } from "../utils"

const signIn: FastifyHandler<{
  Body: z.infer<typeof SignInSchema>
  Reply: AuthTokenType
}> = async (req, res) => {
  try {
    const { login, password } = req.body

    const loginType = emailRegexp.test(login) ? "email" : "username"

    const user = await userRepository.findOne({ where: { [loginType]: login } })

    if (!user) {
      throw new Error("User doesn't exit")
    }

    const isPasswordCorrect = await bcrypt.compare(password, user!.password)

    if (!isPasswordCorrect) {
      throw new Error("Passwords do not match")
    }

    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
        data: String(user.id),
      },
      process.env.SECRET_TOKEN!
    )

    return { token }
  } catch (e) {
    console.log(e)
    res.status(500)
  }
}

const signUp: FastifyHandler<{
  Body: z.infer<typeof SignUpSchema>
  Reply: AuthTokenType
}> = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(
      req.body.password,
      Number(process.env.SALT_ROUNDS)
    )

    const userModel = new User()
    const user = { ...userModel, ...req.body, password: hashedPassword }

    const isEmailUsed = await userRepository.findOne({
      where: { email: req.body.email },
    })

    if (isEmailUsed) {
      throw new Error("E-mail is already used")
    }

    const isUsernameUsed = await userRepository.findOne({
      where: { username: req.body.username },
    })

    if (isUsernameUsed) {
      throw new Error("Username is already used")
    }

    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
        data: String(user.id),
      },
      process.env.SECRET_TOKEN!
    )

    await userRepository.save(user)

    return { token }
  } catch (e) {
    console.log(e)
    res.status(500)
  }
}

const checkEmailAvailability: FastifyHandler<{
  Body: Pick<z.infer<typeof CredentialsSchema>, "email">
  Reply: FieldAvailability
}> = async (req) => {
  const { email } = req.body
  let isAvailable = true

  const user = await userRepository.findOne({ where: { email } })

  if (user) {
    isAvailable = false
  }

  return { isAvailable }
}

const checkUsernameAvailability: FastifyHandler<{
  Body: z.infer<typeof UsernameSchema>
  Reply: FieldAvailability
}> = async (req) => {
  const { username } = req.body
  let isAvailable = true

  const user = await userRepository.findOne({ where: { username } })

  if (user) {
    isAvailable = false
  }

  return { isAvailable }
}

const checkTokenValidity: FastifyHandler<{
  Body: AuthTokenType
}> = () => {
  return { message: "Success" }
}

export const AuthController = {
  signIn,
  signUp,
  checkEmailAvailability,
  checkUsernameAvailability,
  checkTokenValidity,
}
