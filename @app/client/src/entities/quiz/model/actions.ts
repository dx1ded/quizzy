import { DraftQuizType } from "@quizzy/common"

export type QuizAction =
  | { type: "SET_IS_SAVING"; payload: boolean }
  | { type: "SET_IS_PUBLISHED"; payload: boolean }
  | { type: "SET_QUIZ"; payload: { quiz: DraftQuizType; isTouched: boolean } }
  | { type: "RESET_QUIZ" }
  | { type: "ADD_QUESTION" }
  | { type: "DUPLICATE_QUESTION"; payload: number }
  | { type: "REMOVE_QUESTION"; payload: number }
  | { type: "CHANGE_ACTIVE_QUESTION"; payload: number }
  | { type: "CHANGE_QUESTION_PICTURE"; payload: string }
  | { type: "CHANGE_QUESTION_BACKGROUND"; payload: string }
  | { type: "CHANGE_COVER"; payload: string }

export function setIsSaving(value: boolean): QuizAction {
  return { type: "SET_IS_SAVING", payload: value }
}

export function setIsPublished(value: boolean): QuizAction {
  return { type: "SET_IS_PUBLISHED", payload: value }
}

export function setQuiz(quiz: DraftQuizType, isTouched?: boolean): QuizAction {
  return { type: "SET_QUIZ", payload: { quiz, isTouched: isTouched || false } }
}

export function resetQuiz(): QuizAction {
  return { type: "RESET_QUIZ" }
}

export function addQuestion(): QuizAction {
  return { type: "ADD_QUESTION" }
}

export function duplicateQuestion(index: number): QuizAction {
  return { type: "DUPLICATE_QUESTION", payload: index }
}

export function removeQuestion(index: number): QuizAction {
  return { type: "REMOVE_QUESTION", payload: index }
}

export function changeActiveQuestion(index: number): QuizAction {
  return { type: "CHANGE_ACTIVE_QUESTION", payload: index }
}

export function changeQuestionPicture(base64: string): QuizAction {
  return { type: "CHANGE_QUESTION_PICTURE", payload: base64 }
}

export function changeQuestionBackground(base64: string): QuizAction {
  return { type: "CHANGE_QUESTION_BACKGROUND", payload: base64 }
}

export function changeCover(base64: string): QuizAction {
  return { type: "CHANGE_COVER", payload: base64 }
}
