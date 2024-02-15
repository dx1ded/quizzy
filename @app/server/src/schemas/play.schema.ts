import { z } from "zod"

export const PlaySessionQuerySchema = z.object({
  sessionToken: z.string(),
  playerToken: z.string().optional(),
})
