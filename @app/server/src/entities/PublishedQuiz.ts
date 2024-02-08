import { Entity, Column, PrimaryColumn } from "typeorm"
import { PublishedQuizType, QuestionType } from "@quizzy/common"

@Entity({ name: "published_quizzes" })
export class PublishedQuiz implements PublishedQuizType {
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

  @Column("int")
  plays!: number

  @Column("int", { array: true, default: [] })
  favoriteBy!: number[]
}
