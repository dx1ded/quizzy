import { QuestionType } from "./types"

export const emptyQuestion: QuestionType = {
  name: "",
  picture: "",
  answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
  correctAnswers: [],
  timeLimit: 10,
  points: 1,
}
