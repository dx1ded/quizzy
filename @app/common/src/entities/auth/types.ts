import { z } from "zod"
import { AuthToken } from "./schemas"

export interface FieldAvailability {
  isAvailable: boolean
}

export type AuthTokenType = z.infer<typeof AuthToken>
