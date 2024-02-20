import { z } from "zod"
import { GamePinSchema, NicknameSchema } from "./schemas"

export type GamePinType = z.infer<typeof GamePinSchema>
export type NicknameType = z.infer<typeof NicknameSchema>
