import { FindQuizType, QuizType } from "@quizzy/common"

export type QuizAction =
  | { type: "SET_IS_SAVING"; payload: boolean }
  | { type: "SET_IS_CREATOR"; payload: boolean }
  | { type: "SET_CREATOR_INFO"; payload: FindQuizType["creatorInfo"] }
  | { type: "SET_QUIZ"; payload: QuizType }
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

export function setIsCreator(value: boolean): QuizAction {
  return { type: "SET_IS_CREATOR", payload: value }
}

export function setCreatorInfo(
  creator: FindQuizType["creatorInfo"]
): QuizAction {
  return { type: "SET_CREATOR_INFO", payload: creator }
}

export function setQuiz(quiz: QuizType): QuizAction {
  return { type: "SET_QUIZ", payload: quiz }
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
