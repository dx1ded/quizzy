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
