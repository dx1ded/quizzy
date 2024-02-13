import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { z } from "zod"
import { SignUpSchema } from "@quizzy/common"

interface IUser extends z.infer<typeof SignUpSchema> {
  picture: string
}

@Entity({ name: "users" })
export class User implements IUser {
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

  @Column("text", {
    default:
      "https://firebasestorage.googleapis.com/v0/b/quizzy-222b7.appspot.com/o/profile-pic.png?alt=media",
  })
  picture!: string
}
