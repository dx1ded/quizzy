import { Entity, Column, PrimaryColumn } from "typeorm"
import { z } from "zod"
import { QuizSchema, QuestionSchema } from "@quizzy/common"

@Entity({ name: "quizzes" })
export class Quiz implements z.infer<typeof QuizSchema> {
  @PrimaryColumn("text")
  id!: string

  @Column("int")
  userRef!: number

  @Column("text")
  name!: string

  @Column("text")
  description!: string

  @Column("text")
  picture!: string

  @Column("text", { array: true, default: [] })
  questions!: z.infer<typeof QuestionSchema>[]

  @Column("int")
  rating!: number

  @Column("int")
  plays!: number
}
