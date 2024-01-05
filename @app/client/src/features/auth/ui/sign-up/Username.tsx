import { Controller } from "react-hook-form"
import { MultistepProps } from "shared/ui/Multistep"
import { AuthForm } from "../AuthForm"
import { AuthLabel } from "../AuthLabel"
import { AuthInput } from "../AuthInput"
import { AuthValidation } from "../AuthValidation"
import { SignUpFormProps, signUpCard, UsernameSchema } from "../../lib"

export function Username({
  data: { username },
  setData,
  setPrevStep,
  setNextStep,
}: MultistepProps<SignUpFormProps>) {
  return (
    <AuthForm
      cardCaption={signUpCard.caption}
      cardTitle={signUpCard.title}
      defaultValues={{ username }}
      setNextStep={setNextStep}
      setPrevStep={setPrevStep}
      validationSchema={UsernameSchema}
      onSubmit={(data, next) => {
        setData((prevState) => ({ ...prevState, ...data }))
        next()
      }}>
      {({ control, initialErrors, loadingField }) => (
        <>
          <AuthLabel htmlFor="username">Username</AuthLabel>
          <div className="relative [&:not(:last-of-type)]:mb-5">
            <span
              className="absolute left-0 top-1/2 flex h-full w-8 -translate-y-1/2 items-center justify-center rounded-l border border-gray bg-accent"
              aria-hidden>
              @
            </span>
            <Controller
              control={control}
              name="username"
              render={({ field, formState }) => (
                <>
                  <AuthInput
                    className="pl-10"
                    id="username"
                    loadingField={loadingField}
                    placeholder="Enter your username"
                    checkAvailability
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                  />
                  <AuthValidation
                    error={formState.errors.username}
                    initialErrors={initialErrors.username}
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
