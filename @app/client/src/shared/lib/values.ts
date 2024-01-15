import { SignInFormProps, SignUpFormProps } from "./types"

export const signInFormState: SignInFormProps = {
  login: "",
  password: "",
}

export const signUpFormState: SignUpFormProps = {
  email: "",
  password: "",
  username: "",
  firstName: "",
  lastName: "",
  dateOfBirth: new Date(),
  interests: [],
}
