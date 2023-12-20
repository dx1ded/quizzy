import { MultistepProps } from "shared/ui/Multistep"
import { AuthForm } from "../AuthForm"
import { AuthLabel } from "../AuthLabel"
import { AuthInput } from "../AuthInput"
import { SignUpFormProps } from "../../lib"

type CredentialsProps = MultistepProps<
  Pick<SignUpFormProps, "email" | "password" | "confirmPassword">
>

export function Credentials(props: CredentialsProps) {
  return (
    <AuthForm
      cardCaption="Create your account in a few steps, and you will get an access to the platform and personal cabinet"
      cardTitle="Sign up">
      {({ register }) => (
        <>
          <AuthLabel htmlFor="email">E-mail</AuthLabel>
          <AuthInput
            id="email"
            placeholder="Enter your e-mail"
            {...register("email")}
          />
          <AuthLabel htmlFor="password">Password</AuthLabel>
          <AuthInput
            id="password"
            placeholder="Enter your password"
            {...register("password")}
          />
          <AuthLabel htmlFor="confirmPassword">Confirm password</AuthLabel>
          <AuthInput
            id="confirmPassword"
            placeholder="Enter your password"
            {...register("confirmPassword")}
          />
        </>
      )}
    </AuthForm>
  )
}
