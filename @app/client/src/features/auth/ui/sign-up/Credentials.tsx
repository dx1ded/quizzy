import { MultistepProps } from "shared/ui/Multistep"
import { AuthForm } from "../AuthForm"
import { AuthLabel } from "../AuthLabel"
import { AuthInput } from "../AuthInput"
import { AuthValidation } from "../AuthValidation"
import {
  ParentMultistepControls,
  SignUpFormProps,
  signUpCard,
  CredentialsSchema,
} from "../../lib"

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
      validationSchema={CredentialsSchema}
      onSubmit={(data, next) => {
        setData((prevState) => ({ ...prevState, ...data }))
        // next()
      }}>
      {({ register, errors }) => (
        <>
          <AuthLabel htmlFor="email">E-mail</AuthLabel>
          <div className="relative [&:not(:last-of-type)]:mb-5">
            <AuthInput
              id="email"
              placeholder="Enter your e-mail"
              type="email"
              {...register("email")}
            />
            <AuthValidation
              error={errors.email}
              initialErrors={errors.initialErrors.email}
            />
          </div>
          <AuthLabel htmlFor="password">Password</AuthLabel>
          <div className="relative [&:not(:last-of-type)]:mb-5">
            <AuthInput
              id="password"
              placeholder="Enter your password"
              type="password"
              {...register("password")}
            />
            <AuthValidation
              error={errors.password}
              initialErrors={errors.initialErrors.password}
            />
          </div>
          <AuthLabel htmlFor="confirmPassword">Confirm password</AuthLabel>
          <div className="relative [&:not(:last-of-type)]:mb-5">
            <AuthInput
              id="confirmPassword"
              placeholder="Enter your password"
              type="password"
              {...register("confirmPassword")}
            />
            <AuthValidation
              error={errors.confirmPassword}
              initialErrors={errors.initialErrors.confirmPassword}
            />
          </div>
        </>
      )}
    </AuthForm>
  )
}
