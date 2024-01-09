import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { z } from "zod"
import { SignUpSchema } from "@quizzy/common"

@Entity({ name: "users" })
export class User implements z.infer<typeof SignUpSchema> {
  @PrimaryGeneratedColumn()
  id!: number

  @Column("text")
  email!: string

  @Column("text")
  password!: string

  @Column("text")
  firstName!: string

  @Column("text")
  lastName!: string

  @Column("text")
  username!: string

  @Column("date")
  dateOfBirth!: Date
}
