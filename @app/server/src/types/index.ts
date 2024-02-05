import {
  FastifyReply,
  FastifyRequest,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteGenericInterface,
} from "fastify"
import { AuthTokenType } from "@quizzy/common"

export type FastifyHandler<
  RequestInterface extends Partial<RouteGenericInterface>,
> = (
  req: FastifyRequest<{
    Body: RequestInterface["Body"]
    Querystring: RequestInterface["Querystring"]
    Params: RequestInterface["Params"]
  }>,
  res: FastifyReply<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression
  >
) =>
  | RequestInterface["Reply"]
  | void
  | Promise<RequestInterface["Reply"] | void>

export type WithUserId<T = unknown> = T & AuthTokenType & { userId: number }
