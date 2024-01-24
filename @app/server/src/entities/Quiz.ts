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
  picture!: string

  @Column("text")
  background!: string

  @Column({ type: "jsonb", array: false, default: () => "'[]'" })
  questions!: QuestionType[]

  @Column("int")
  rating!: number

  @Column("int")
  plays!: number
}
