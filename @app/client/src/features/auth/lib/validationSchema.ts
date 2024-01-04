import { z } from "zod"

export const CredentialsSchema = z
  .object({
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
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  })

export const FullNameSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
})

export const UsernameSchema = z.object({
  username: z
    .string()
    .min(3, "Username should be at least 3 letters in length")
    .min(16, "Username should be 16 letters max"),
})

export const DateOfBirthSchema = z.object({
  dateOfBirth: z
    .date()
    .max(
      new Date(Date.now() - 504576000000),
      "You must be at least 16 years old"
    ),
})
