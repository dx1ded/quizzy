import { SignInReq, SignUpReq } from "@quizzy/common"

export type SignInFormProps = SignInReq

export type SignUpFormProps = SignUpReq & {
  confirmPassword: string
}
