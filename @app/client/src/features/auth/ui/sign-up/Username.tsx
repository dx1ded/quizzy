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
          <div className="relative">
            <span
              className="absolute left-0 top-1/2 flex h-full w-8 -translate-y-1/2 items-center justify-center rounded-l border border-gray bg-accent"
              aria-hidden>
              @
            </span>
            <AuthInput
              className="pl-10"
              id="username"
              placeholder="Enter your username"
              {...register("username")}
            />
          </div>
        </>
      )}
    </AuthForm>
  )
}
