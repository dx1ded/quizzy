export type RecordType = {
  id: string
  quizId: string
  quizName: string
  userRef: number
  points: number
  date: number
  playersIds: number[]
}

export type GetRecordsType = {
  records: RecordType[]
  isCreator: boolean[]
}
