import { MultistepProps } from "shared/ui/Multistep"
import { AuthForm } from "../AuthForm"
import { AuthLabel } from "../AuthLabel"
import { AuthInput } from "../AuthInput"
import { ParentMultistepControls, SignUpFormProps, signUpCard } from "../../lib"

export function Credentials({
  setData,
  setNextStep,
  parentSetPrev,
}: MultistepProps<SignUpFormProps> & ParentMultistepControls) {
  return (
    <AuthForm
      cardCaption={signUpCard.caption}
      cardTitle={signUpCard.title}
      setNextStep={setNextStep}
      setPrevStep={parentSetPrev}
      onSubmit={(data, next) => {
        setData((prevState) => ({ ...prevState, ...data }))
        next()
      }}>
      {({ register }) => (
        <>
          <AuthLabel htmlFor="email">E-mail</AuthLabel>
          <AuthInput
            id="email"
            placeholder="Enter your e-mail"
            type="email"
            {...register("email")}
          />
          <AuthLabel htmlFor="password">Password</AuthLabel>
          <AuthInput
            id="password"
            placeholder="Enter your password"
            type="password"
            {...register("password")}
          />
          <AuthLabel htmlFor="confirmPassword">Confirm password</AuthLabel>
          <AuthInput
            id="confirmPassword"
            placeholder="Enter your password"
            type="password"
            {...register("confirmPassword")}
          />
        </>
      )}
    </AuthForm>
  )
}
