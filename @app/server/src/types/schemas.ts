import { z } from "zod"

export const SignInResponse = z.object({
  message: z.string(),
})
