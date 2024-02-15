import { z } from "zod"

export const PlaySessionQuerySchema = z.object({
  sessionToken: z.number(),
  playerToken: z.string().optional(),
})
