import { SocketStream } from "@fastify/websocket"
import {
  FastifyReply,
  FastifyRequest,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteGenericInterface,
} from "fastify"
import {
  AnswerType,
  AuthTokenType,
  ChangeAvatarType,
  JoinType,
} from "@quizzy/common"

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

export type FastifyWebsocketHandler<
  RequestInterface extends Partial<RouteGenericInterface>,
> = (
  connection: SocketStream,
  req: FastifyRequest<{
    Body: RequestInterface["Body"]
    Querystring: RequestInterface["Querystring"]
    Params: RequestInterface["Params"]
  }>
) => void

export type WithUserId<T = unknown> = T & AuthTokenType & { userId: number }

export type PlaySessionMessage =
  | { type: "menu" }
  | { type: "start" }
  | { type: "join"; body: JoinType }
  | { type: "answer"; body: AnswerType }
  | { type: "change_avatar"; body: ChangeAvatarType }
  | { type: "leave" }
