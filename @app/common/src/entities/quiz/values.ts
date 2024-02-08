import { QuestionType, DraftQuizType } from "./types"

export const emptyQuestion: QuestionType = {
  name: "New question",
  picture: "",
  background: "",
  correctAnswers: [false, false, false, false],
  answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
  timeLimit: 10,
  points: 1,
}

export const defaultQuiz = (id: string, userRef: number): DraftQuizType => ({
  id,
  name: "New quiz",
  description: "Quiz description",
  userRef,
  cover: "",
  questions: [emptyQuestion],
})
