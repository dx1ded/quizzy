import { CredentialsSchema } from "@quizzy/common"
import { Controller } from "react-hook-form"
import { SignUpFormProps } from "shared/lib"
import { MultistepProps } from "shared/ui/Multistep"
import { AuthForm } from "../AuthForm"
import { AuthLabel } from "../AuthLabel"
import { AuthInput } from "../AuthInput"
import { AuthValidation } from "../AuthValidation"
import { ParentMultistepControls, signUpCard } from "../../lib"

export function Credentials({
  data: { email, password },
  setData,
  setNextStep,
  parentSetPrev,
}: MultistepProps<SignUpFormProps> & ParentMultistepControls) {
  return (
    <AuthForm
      cardCaption={signUpCard.caption}
      cardTitle={signUpCard.title}
      defaultValues={{ email, password, confirmPassword: "" }}
      setNextStep={setNextStep}
      setPrevStep={parentSetPrev}
      validationSchema={CredentialsSchema}
      onSubmit={(formData, next) => {
        const withoutConfirm = { ...formData }
        delete withoutConfirm.confirmPassword

        setData((prevState) => ({ ...prevState, ...withoutConfirm }))
        next()
      }}>
      {({ control, initialErrors, loadingField, setFocusedField }) => (
        <>
          <AuthLabel htmlFor="email">E-mail</AuthLabel>
          <div className="relative [&:not(:last-of-type)]:mb-5">
            <Controller
              control={control}
              name="email"
              render={({ field, formState }) => (
                <>
                  <AuthInput
                    id="email"
                    loadingField={loadingField}
                    placeholder="Enter your e-mail"
                    type="email"
                    onBlur={() => setFocusedField(null)}
                    onChange={field.onChange}
                    onFocus={(e) => setFocusedField(e.target.id)}
                  />
                  <AuthValidation
                    error={formState.errors.email}
                    initialErrors={initialErrors.email}
                  />
                </>
              )}
            />
          </div>
          <AuthLabel htmlFor="password">Password</AuthLabel>
          <div className="relative [&:not(:last-of-type)]:mb-5">
            <Controller
              control={control}
              name="password"
              render={({ field, formState }) => (
                <>
                  <AuthInput
                    id="password"
                    placeholder="Enter your password"
                    type="password"
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                  />
                  <AuthValidation
                    error={formState.errors.password}
                    initialErrors={initialErrors.password}
                  />
                </>
              )}
            />
          </div>
          <AuthLabel htmlFor="confirmPassword">Confirm password</AuthLabel>
          <div className="relative [&:not(:last-of-type)]:mb-5">
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field, formState }) => (
                <>
                  <AuthInput
                    id="confirmPassword"
                    placeholder="Enter your password"
                    type="password"
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                  />
                  <AuthValidation
                    error={formState.errors.confirmPassword}
                    initialErrors={initialErrors.confirmPassword}
                  />
                </>
              )}
            />
          </div>
        </>
      )}
    </AuthForm>
  )
}
