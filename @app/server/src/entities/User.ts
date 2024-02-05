import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { z } from "zod"
import { SignUpSchema } from "@quizzy/common"

interface UserType extends z.infer<typeof SignUpSchema> {
  favorites: string[]
}

@Entity({ name: "users" })
export class User implements UserType {
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

  @Column("text", { array: true, default: [] })
  interests!: string[]

  @Column("text", { array: true, default: [] })
  favorites!: string[]
}
