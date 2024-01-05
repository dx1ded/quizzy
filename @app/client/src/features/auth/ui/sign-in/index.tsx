import { Controller } from "react-hook-form"
import { AuthForm } from "../AuthForm"
import { AuthInput } from "../AuthInput"
import { AuthLabel } from "../AuthLabel"
import { AuthValidation } from "../AuthValidation"
import {
  ParentMultistepControls,
  signInCard,
  SignInSchema,
  signInFormState,
} from "../../lib"

export function SignIn({ parentSetPrev }: ParentMultistepControls) {
  return (
    <AuthForm
      cardCaption={signInCard.caption}
      cardTitle={signInCard.title}
      defaultValues={signInFormState}
      setPrevStep={parentSetPrev}
      validationSchema={SignInSchema}
      onSubmit={(data) => {
        console.log(data)
      }}>
      {({ control, initialErrors }) => (
        <>
          <AuthLabel htmlFor="login">Login</AuthLabel>
          <div className="relative [&:not(:last-of-type)]:mb-5">
            <Controller
              control={control}
              name="login"
              render={({ field, formState }) => (
                <>
                  <AuthInput
                    id="login"
                    placeholder="Enter your username or e-mail"
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                  />
                  <AuthValidation
                    error={formState.errors.login}
                    initialErrors={initialErrors.login}
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
        </>
      )}
    </AuthForm>
  )
}
