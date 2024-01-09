import {
  FastifyReply,
  FastifyRequest,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from "fastify"

export type FastifyHandler<RequestBody, ResponseBody> = (
  req: FastifyRequest<{ Body: RequestBody }>,
  res: FastifyReply<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression
  >
) => ResponseBody | void | Promise<ResponseBody | void>
