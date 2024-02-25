import { useDispatch } from "react-redux"
import { Controller } from "react-hook-form"
import { AuthTokenType, SignInSchema } from "@quizzy/common"
import { login } from "entities/account"
import { signInFormState } from "shared/lib"
import { AuthForm } from "../AuthForm"
import { AuthInput } from "../AuthInput"
import { AuthLabel } from "../AuthLabel"
import { AuthValidation } from "../AuthValidation"
import { ParentMultistepControls, signInCard } from "../../lib"

export function SignIn({ parentSetPrev }: ParentMultistepControls) {
  const dispatch = useDispatch()

  return (
    <AuthForm
      cardCaption={signInCard.caption}
      cardTitle={signInCard.title}
      defaultValues={signInFormState}
      setPrevStep={parentSetPrev}
      validationSchema={SignInSchema}
      onSubmit={(credentials, _, setError) => {
        fetch("/api/auth/sign-in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        })
          .then((res) => res.json())
          .then(({ token }: AuthTokenType) => dispatch(login(token)))
          .catch(() =>
            setError("login", {
              type: "custom",
              message: "User was not found!",
            })
          )
      }}>
      {({ control, initialErrors }) => (
        <>
          <AuthLabel htmlFor="login">Login</AuthLabel>
          <div className="relative [&:not(:last-of-type)]:mb-5 sm:[&:not(:last-of-type)]:mb-3">
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
          <div className="relative [&:not(:last-of-type)]:mb-5 sm:[&:not(:last-of-type)]:mb-3">
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
