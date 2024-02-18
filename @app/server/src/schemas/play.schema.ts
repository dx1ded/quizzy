import { z } from "zod"

export const PlaySessionIdSchema = z.object({
  sessionId: z.string(),
})

export const PlaySessionQuerySchema = z.object({
  sessionId: z.string(),
  playerToken: z.string().optional(),
})
