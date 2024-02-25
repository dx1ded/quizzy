import { MouseEvent } from "react"
import { SignUp, SignIn, authCard, AuthForm } from "features/auth"
import { Button } from "shared/ui/Button"
import { Multistep, MultistepProps } from "shared/ui/Multistep"

type AuthMethods = "" | "sign-in" | "sign-up"

const defaultState: { authMethod: AuthMethods } = {
  authMethod: "",
}

export function Auth() {
  const methodClickHandler = (
    e: MouseEvent<HTMLButtonElement>,
    { setData, setNextStep }: MultistepProps<typeof defaultState>
  ) => {
    const method = (e.target as HTMLButtonElement).dataset.method as AuthMethods

    setData({ authMethod: method })
    setNextStep()
  }

  return (
    <div className="flex min-h-screen items-center bg-primary">
      <Multistep defaultState={defaultState}>
        {(props) => (
          <>
            <AuthForm
              cardCaption={authCard.caption}
              cardTitle={authCard.title}
              defaultValues={defaultState}
              withNavigation={false}
              {...props}>
              {() => (
                <div className="grid grid-cols-2 gap-x-4 sm:gap-x-3">
                  <Button
                    className="sm:text-xs"
                    data-method="sign-up"
                    size="lg"
                    variant="white"
                    onClick={(e) => methodClickHandler(e, props)}>
                    Sign up
                  </Button>
                  <Button
                    className="sm:text-xs"
                    data-method="sign-in"
                    size="lg"
                    variant="secondary"
                    onClick={(e) => methodClickHandler(e, props)}>
                    Sign in
                  </Button>
                </div>
              )}
            </AuthForm>
            {props.data.authMethod === "sign-in" ? (
              <SignIn parentSetPrev={props.setPrevStep} />
            ) : (
              <SignUp parentSetPrev={props.setPrevStep} />
            )}
          </>
        )}
      </Multistep>
    </div>
  )
}
