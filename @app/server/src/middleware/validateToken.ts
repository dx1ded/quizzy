import jwt, { JwtPayload } from "jsonwebtoken"
import { AuthTokenType } from "@quizzy/common"
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify"
import { WithUserId } from "../types"

export const validateToken = (
  req: FastifyRequest<{ Body: WithUserId<AuthTokenType> }>,
  res: FastifyReply,
  next: HookHandlerDoneFunction
) => {
  return jwt.verify(
    req.body.token,
    process.env.SECRET_TOKEN!,
    (err, decoded) => {
      if (err) {
        return res.code(401).send({ message: "Secret token is invalid" })
      }

      req.body.userId = (decoded as JwtPayload).data
      next()
    }
  )
}
