import { QuestionType } from "./types"

export const emptyQuestion: QuestionType = {
  name: "",
  picture: "",
  background: "",
  correctAnswers: [false, false, false, false],
  answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
  timeLimit: 10,
  points: 1,
}
