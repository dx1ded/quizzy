import { Controller } from "react-hook-form"
import { FullNameSchema } from "@quizzy/common"
import { MultistepProps } from "shared/ui/Multistep"
import { AuthForm } from "../AuthForm"
import { AuthLabel } from "../AuthLabel"
import { AuthInput } from "../AuthInput"
import { AuthValidation } from "../AuthValidation"
import { SignUpFormProps, signUpCard } from "../../lib"

export function FullName({
  data: { firstName, lastName },
  setData,
  setPrevStep,
  setNextStep,
}: MultistepProps<SignUpFormProps>) {
  return (
    <AuthForm
      cardCaption={signUpCard.caption}
      cardTitle={signUpCard.title}
      defaultValues={{ firstName, lastName }}
      setNextStep={setNextStep}
      setPrevStep={setPrevStep}
      validationSchema={FullNameSchema}
      onSubmit={(data, next) => {
        setData((prevState) => ({ ...prevState, ...data }))
        next()
      }}>
      {({ control, initialErrors }) => (
        <>
          <AuthLabel htmlFor="firstName">First name</AuthLabel>
          <div className="relative [&:not(:last-of-type)]:mb-5">
            <Controller
              control={control}
              name="firstName"
              render={({ field, formState }) => (
                <>
                  <AuthInput
                    id="firstName"
                    placeholder="Enter your first name"
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                  />
                  <AuthValidation
                    error={formState.errors.firstName}
                    initialErrors={initialErrors.firstName}
                  />
                </>
              )}
            />
          </div>
          <AuthLabel htmlFor="lastName">Last name</AuthLabel>
          <div className="relative [&:not(:last-of-type)]:mb-5">
            <Controller
              control={control}
              name="lastName"
              render={({ field, formState }) => (
                <>
                  <AuthInput
                    id="lastName"
                    placeholder="Enter your last name"
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                  />
                  <AuthValidation
                    error={formState.errors.lastName}
                    initialErrors={initialErrors.lastName}
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
