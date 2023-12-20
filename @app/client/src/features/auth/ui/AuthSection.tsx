import { MouseEvent } from "react"
import { Multistep, MultistepProps } from "shared/ui/Multistep"
import { Button } from "shared/ui/Button"
import { AuthForm } from "./AuthForm"
import { SignIn } from "./sign-in"
import { SignUp } from "./sign-up"

type AuthMethods = "" | "sign-in" | "sign-up"

const defaultState: { authMethod: AuthMethods } = {
  authMethod: "",
}

export function AuthSection() {
  const methodClickHandler = (
    e: MouseEvent<HTMLButtonElement>,
    { setData, setNextStep }: MultistepProps<typeof defaultState>
  ) => {
    const method = (e.target as HTMLButtonElement).dataset.method as AuthMethods

    setData({ authMethod: method })
    setNextStep()
  }

  return (
    <Multistep defaultState={defaultState}>
      {(props) => (
        <>
          <AuthForm
            cardCaption="Choose an authentication method to have access to our platform!"
            cardTitle="Authentication"
            withNavigation={false}
            {...props}>
            {() => (
              <div className="flex gap-4">
                <Button
                  className="flex-1"
                  data-method="sign-up"
                  size="lg"
                  variant="white"
                  onClick={(e) => methodClickHandler(e, props)}>
                  Sign up
                </Button>
                <Button
                  className="flex-1"
                  data-method="sign-in"
                  size="lg"
                  variant="secondary"
                  onClick={(e) => methodClickHandler(e, props)}>
                  Sign in
                </Button>
              </div>
            )}
          </AuthForm>
          {props.data.authMethod === "sign-in" ? <SignIn /> : <SignUp />}
        </>
      )}
    </Multistep>
  )
}
