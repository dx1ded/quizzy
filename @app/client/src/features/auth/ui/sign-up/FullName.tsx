import { AuthForm } from "../AuthForm"
import { AuthLabel } from "../AuthLabel"
import { AuthInput } from "../AuthInput"

export function FullName() {
  return (
    <AuthForm
      cardCaption="Create your account in a few steps, and you will get an access to the platform and personal cabinet"
      cardTitle="Sign up">
      {({ register }) => (
        <>
          <AuthLabel htmlFor="firstName">First name</AuthLabel>
          <AuthInput
            id="firstName"
            placeholder="Enter your first name"
            {...register("firstName")}
          />
          <AuthLabel htmlFor="lastName">Last name</AuthLabel>
          <AuthInput
            id="lastName"
            placeholder="Enter your last name"
            {...register("lastName")}
          />
        </>
      )}
    </AuthForm>
  )
}
