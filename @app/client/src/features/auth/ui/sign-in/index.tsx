import { AuthForm } from "../AuthForm"
import { AuthInput } from "../AuthInput"
import { AuthLabel } from "../AuthLabel"

export function SignIn() {
  return (
    <AuthForm
      cardCaption="Sign in to your account so you can have an access to our platform"
      cardTitle="Sign in">
      {({ register }) => (
        <>
          <AuthLabel htmlFor="login">Login</AuthLabel>
          <AuthInput
            id="login"
            placeholder="Enter your username or e-mail"
            {...register("login")}
          />
          <AuthLabel htmlFor="password">Password</AuthLabel>
          <AuthInput
            id="password"
            placeholder="Enter your password"
            {...register("password")}
          />
        </>
      )}
    </AuthForm>
  )
}
