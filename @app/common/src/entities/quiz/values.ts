import { QuestionType, QuizType } from "./types"

export const emptyQuestion: QuestionType = {
  name: "New question",
  picture: "",
  background: "",
  correctAnswers: [true, false, false, false],
  answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
  timeLimit: 10,
  points: 1,
}

export const defaultQuiz = (id: string, userRef: number): QuizType => ({
  id,
  name: "New quiz",
  description: "Quiz description",
  userRef,
  cover: "",
  questions: [emptyQuestion],
  rating: 0,
  plays: 0,
})
