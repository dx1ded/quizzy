import { Entity, Column, PrimaryColumn } from "typeorm"
import { DraftQuizType, QuestionType } from "@quizzy/common"

@Entity({ name: "draft_quizzes" })
export class DraftQuiz implements DraftQuizType {
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
}
