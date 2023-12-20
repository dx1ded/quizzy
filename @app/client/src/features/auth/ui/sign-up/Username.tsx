import { AuthForm } from "../AuthForm"
import { AuthLabel } from "../AuthLabel"
import { AuthInput } from "../AuthInput"

export function Username() {
  return (
    <AuthForm
      cardCaption="Create your account in a few steps, and you will get an access to the platform and personal cabinet"
      cardTitle="Sign up">
      {({ register }) => (
        <>
          <AuthLabel htmlFor="username">Username</AuthLabel>
          <AuthInput
            id="username"
            placeholder="Enter your username"
            {...register("username")}
          />
        </>
      )}
    </AuthForm>
  )
}
