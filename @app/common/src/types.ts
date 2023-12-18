export interface User {
  id: string
  email: string
  password: string
  username: string
  firstName: string
  lastName: string
  dateOfBirth: string
  interests: string[]
}

export type SignInReq = Pick<User, "password"> & {
  login: User["id"] | User["username"]
}

export type SignUpReq = Pick<
  User,
  | "email"
  | "password"
  | "username"
  | "firstName"
  | "lastName"
  | "dateOfBirth"
  | "interests"
>
