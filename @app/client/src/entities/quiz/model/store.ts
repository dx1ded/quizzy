import { FindQuizType, emptyQuestion, QuizType } from "@quizzy/common"
import { QuizAction } from "./actions"

export interface QuizState {
  data: QuizType
  activeQuestion: number
  isCreator: boolean
  isSaving: boolean
  creatorInfo: FindQuizType["creatorInfo"]
}

const initialState: QuizState = {
  isSaving: false,
  data: {
    id: "",
    name: "",
    description: "",
    userRef: 0,
    cover: "",
    questions: [emptyQuestion],
    rating: 0,
    plays: 0,
  },
  activeQuestion: 0,
  isCreator: false,
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
    case "SET_CREATOR_INFO":
      return { ...state, creatorInfo: action.payload }
    case "SET_QUIZ":
      return { ...state, data: action.payload }
    case "ADD_QUESTION":
      return {
        ...state,
        data: {
          ...state.data,
          questions: [...state.data.questions, emptyQuestion],
        },
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
      }
    case "CHANGE_COVER":
      return {
        ...state,
        data: {
          ...state.data,
          cover: action.payload,
        },
      }
    default:
      return state
  }
}
