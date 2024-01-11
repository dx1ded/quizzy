import { z } from "zod"
import { FieldAvailability } from "./types"

export const Credentials = z.object({
  email: z.string().email("E-mail should be valid"),
  password: z
    .string()
    .min(8, "Minimum 8 letters")
    .regex(/[A-Z]/, {
      message: "At least one capital letter",
    })
    .regex(/[*@!#%&()^~{}]+/, {
      message: "At least one special letter (@,!,#,%,&, ...)",
    }),
  confirmPassword: z.string().optional(),
})

export const CredentialsSchema = Credentials.refine(
  (data) =>
    data.password === data.confirmPassword && data.confirmPassword !== "",
  {
    message: "Passwords must match",
    path: ["confirmPassword"],
  }
).refine(async (data) => {
  const request = await fetch("/api/auth/check-email", {
    method: "POST",
    body: JSON.stringify({ email: data.email }),
    headers: {
      "Content-Type": "application/json",
    },
  })

  const { isAvailable } = (await request.json()) as Awaited<
    Promise<FieldAvailability>
  >

  return isAvailable
}, "E-mail is already used")

export const FullNameSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
})

export const UsernameSchema = z.object({
  username: z
    .string()
    .min(3, "Username should be at least 3 letters in length")
    .max(16, "Username should be 16 letters max"),
})

export const DateOfBirthSchema = z.object({
  dateOfBirth: z.coerce
    .date()
    .max(
      new Date(Date.now() - 504576000000),
      "You must be at least 16 years old"
    ),
})

const InterestsSchema = z.object({
  interests: z.string().array(),
})

export const SignInSchema = z.object({
  login: z.string().min(1, "Login is required"),
  password: z
    .string()
    .min(8, "Minimum 8 letters")
    .regex(/[A-Z]/, {
      message: "At least one capital letter",
    })
    .regex(/[*@!#%&()^~{}]+/, {
      message: "At least one special letter (@,!,#,%,&, ...)",
    }),
})

export const SignUpSchema = Credentials.omit({ confirmPassword: true })
  .and(FullNameSchema)
  .and(UsernameSchema)
  .and(DateOfBirthSchema)
  .and(InterestsSchema)
