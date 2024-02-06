import {
  GetQuizType,
  emptyQuestion,
  QuizType,
  defaultQuiz,
} from "@quizzy/common"
import { QuizAction } from "./actions"

export interface QuizState {
  data: QuizType
  activeQuestion: number
  isCreator: boolean
  isFavorite: boolean
  isSaving: boolean
  isTouched: boolean
  creatorInfo: GetQuizType["creatorInfo"]
}

const initialState: QuizState = {
  data: defaultQuiz("", -1),
  activeQuestion: 0,
  isCreator: false,
  isFavorite: false,
  isSaving: false,
  isTouched: false,
  creatorInfo: { username: "" },
}

export const quizReducer = (
  state: QuizState = initialState,
  action: QuizAction
) => {
  switch (action.type) {
    case "SET_IS_SAVING":
      return { ...state, isSaving: action.payload }
    case "SET_IS_CREATOR":
      return { ...state, isCreator: action.payload }
    case "SET_IS_FAVORITE":
      return { ...state, isFavorite: action.payload }
    case "SET_CREATOR_INFO":
      return { ...state, creatorInfo: action.payload }
    case "SET_QUIZ":
      return {
        ...state,
        data: action.payload.quiz,
        isTouched: action.payload.isTouched,
      }
    case "RESET_QUIZ":
      return initialState
    case "ADD_QUESTION":
      return {
        ...state,
        data: {
          ...state.data,
          questions: [...state.data.questions, emptyQuestion],
        },
        isTouched: true,
      }
    case "DUPLICATE_QUESTION":
      return {
        ...state,
        data: {
          ...state.data,
          questions: [
            ...state.data.questions.slice(0, action.payload),
            state.data.questions[action.payload],
            ...state.data.questions.slice(action.payload),
          ],
        },
        isTouched: true,
      }
    case "REMOVE_QUESTION":
      return {
        ...state,
        data: {
          ...state.data,
          questions:
            state.data.questions.length > 1
              ? state.data.questions.filter((_, i) => i !== action.payload)
              : state.data.questions,
        },
        activeQuestion:
          state.data.questions.length === state.activeQuestion
            ? state.activeQuestion - 1
            : state.activeQuestion,
        isTouched: true,
      }
    case "CHANGE_ACTIVE_QUESTION":
      return {
        ...state,
        activeQuestion: action.payload,
      }
    case "CHANGE_QUESTION_PICTURE":
      return {
        ...state,
        data: {
          ...state.data,
          questions: state.data.questions.map((question, i) =>
            i === state.activeQuestion
              ? { ...question, picture: action.payload }
              : question
          ),
        },
        isTouched: true,
      }
    case "CHANGE_QUESTION_BACKGROUND":
      return {
        ...state,
        data: {
          ...state.data,
          questions: state.data.questions.map((question, i) =>
            i === state.activeQuestion
              ? { ...question, background: action.payload }
              : question
          ),
        },
        isTouched: true,
      }
    case "CHANGE_COVER":
      return {
        ...state,
        data: {
          ...state.data,
          cover: action.payload,
        },
        isTouched: true,
      }
    default:
      return state
  }
}
