import { MultistepProps } from "shared/ui/Multistep"
import { AuthForm } from "../AuthForm"
import { AuthLabel } from "../AuthLabel"
import { AuthInput } from "../AuthInput"
import { SignUpFormProps, signUpCard } from "../../lib"

export function FullName({
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
          <AuthLabel htmlFor="firstName">First name</AuthLabel>
          <AuthInput
            id="firstName"
            placeholder="Enter your first name"
            {...register("firstName")}
          />
          <AuthLabel htmlFor="lastName">Last name</AuthLabel>
          <AuthInput
            id="lastName"
            placeholder="Enter your last name"
            {...register("lastName")}
          />
        </>
      )}
    </AuthForm>
  )
}
