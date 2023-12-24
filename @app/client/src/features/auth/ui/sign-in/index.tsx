import { AuthForm } from "../AuthForm"
import { AuthInput } from "../AuthInput"
import { AuthLabel } from "../AuthLabel"
import { ParentMultistepControls, signInCard } from "../../lib"

export function SignIn({ parentSetPrev }: ParentMultistepControls) {
  return (
    <AuthForm
      cardCaption={signInCard.caption}
      cardTitle={signInCard.title}
      setPrevStep={parentSetPrev}>
      {({ register }) => (
        <>
          <AuthLabel htmlFor="login">Login</AuthLabel>
          <AuthInput
            id="login"
            placeholder="Enter your username or e-mail"
            type="email"
            {...register("login")}
          />
          <AuthLabel htmlFor="password">Password</AuthLabel>
          <AuthInput
            id="password"
            placeholder="Enter your password"
            type="password"
            {...register("password")}
          />
        </>
      )}
    </AuthForm>
  )
}
