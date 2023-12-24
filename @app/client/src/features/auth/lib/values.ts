import { SignInFormProps, SignUpFormProps } from "./types"

export const signInFormState: SignInFormProps = {
  login: "",
  password: "",
}

export const signUpFormState: SignUpFormProps = {
  email: "",
  password: "",
  confirmPassword: "",
  username: "",
  firstName: "",
  lastName: "",
  dateOfBirth: 0,
  interests: [],
}

export const authCard = {
  title: "Authentication",
  caption: "Choose an authentication method to have access to our platform",
}

export const signInCard = {
  title: "Sign in",
  caption: "Sign in to your account so you can have an access to our platform",
}

export const signUpCard = {
  title: "Sign up",
  caption:
    "Create your account in a few steps, and you will get an access to the platform and personal cabinet",
}
