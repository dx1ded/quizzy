export type RecordResult = {
  id: number
  nickname: string
  points: number
}

export type RecordType = {
  id: string
  quizId: string
  quizName: string
  userRef: number
  date: number
  result: RecordResult[]
}

export type GetRecordsType = {
  records: RecordType[]
  isCreator: boolean[]
}
