import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity({ name: "records" })
export class Records {
  @PrimaryColumn("text")
  id!: string

  @Column("text")
  quizId!: string

  @Column("int")
  userRef!: number

  @Column("int")
  points!: number

  @Column("date")
  date!: Date

  @Column("int")
  numberOfPlayers!: number
}
