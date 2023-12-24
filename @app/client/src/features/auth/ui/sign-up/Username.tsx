import { MultistepProps } from "shared/ui/Multistep"
import { AuthForm } from "../AuthForm"
import { AuthLabel } from "../AuthLabel"
import { AuthInput } from "../AuthInput"
import { SignUpFormProps, signUpCard } from "../../lib"

export function Username({
  setData,
  setPrevStep,
  setNextStep,
}: MultistepProps<SignUpFormProps>) {
  return (
    <AuthForm
      cardCaption={signUpCard.caption}
      cardTitle={signUpCard.title}
      setNextStep={setNextStep}
      setPrevStep={setPrevStep}
      onSubmit={(data, next) => {
        setData((prevState) => ({ ...prevState, ...data }))
        next()
      }}>
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
