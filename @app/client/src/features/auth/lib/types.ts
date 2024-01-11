import { SignInSchema, SignUpSchema } from "@quizzy/common"
import { z } from "zod"

export type SignInFormProps = z.infer<typeof SignInSchema>

export type SignUpFormProps = z.infer<typeof SignUpSchema>

export interface ParentMultistepControls {
  parentSetPrev(): void
}
