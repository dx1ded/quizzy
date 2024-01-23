import { Entity, Column, PrimaryColumn } from "typeorm"
import { z } from "zod"
import { QuizSchema, QuestionSchema } from "@quizzy/common"

@Entity({ name: "quizzes" })
export class Quiz implements z.infer<typeof QuizSchema> {
  @PrimaryColumn("text")
  id!: string

  @Column({ type: "int", default: 0 })
  userRef!: number

  @Column("text")
  name!: string

  @Column("text")
  picture!: string

  @Column("text", { array: true, default: [] })
  questions!: z.infer<typeof QuestionSchema>[]
}
