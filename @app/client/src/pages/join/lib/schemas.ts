import { z } from "zod"

export const GamePinSchema = z.object({
  pin: z.string().min(8, "Game PIN should be 8 numbers in length"),
})

export const NicknameSchema = z.object({
  nickname: z.string().min(1, "Nickname should be at least 1 letter in length"),
})
