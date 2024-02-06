import { Entity, Column, PrimaryColumn } from "typeorm"
import { QuizType, QuestionType } from "@quizzy/common"

@Entity({ name: "quizzes" })
export class Quiz implements QuizType {
  @PrimaryColumn("text")
  id!: string

  @Column("int")
  userRef!: number

  @Column("text")
  name!: string

  @Column("text")
  description!: string

  @Column("text")
  cover!: string

  @Column({ type: "jsonb" })
  questions!: QuestionType[]

  @Column("int")
  rating!: number

  @Column("int", { array: true, default: [] })
  favoriteBy!: number[]

  @Column("int")
  plays!: number
}
