import { Entity, Column, PrimaryColumn } from "typeorm"
import { RecordType } from "@quizzy/common"

@Entity({ name: "records" })
export class Record implements RecordType {
  @PrimaryColumn("text")
  id!: string

  @Column("text")
  quizId!: string

  @Column("text")
  quizName!: string

  /**
   * The person who started the quiz
   */
  @Column("int")
  userRef!: number

  @Column("int")
  points!: number

  @Column("int8")
  date!: number

  @Column("int", { array: true })
  playersIds!: number[]
}
