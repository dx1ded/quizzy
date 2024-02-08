import { ChangeEvent, cloneElement, ReactElement, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useFormContext } from "react-hook-form"
import { DraftQuizType } from "@quizzy/common"
import {
  addQuestion,
  changeActiveQuestion,
  changeQuestionBackground,
  changeQuestionPicture,
  duplicateQuestion,
  QuizState,
  removeQuestion,
} from "entities/quiz"
import { AddPhoto } from "shared/icons/AddPhoto"
import { Input } from "shared/ui/Input"
import type { AppStore } from "app/model"
import { convertToBase64, ElementRenderProp } from "../lib"
import { EditContext } from "../model"
import {
  AnswerProps,
  CircleAnswer,
  RhombusAnswer,
  SquareAnswer,
  TriangleAnswer,
} from "./Answer"
import { EditValidation } from "./EditValidation"

interface SwitchQuestionProps extends ElementRenderProp {
  n: number
}

export function SwitchQuestion({ render, n }: SwitchQuestionProps) {
  const dispatch = useDispatch()

  return cloneElement(render(), {
    onClick: () => dispatch(changeActiveQuestion(n)),
  })
}

export function AddQuestion({ render }: ElementRenderProp) {
  const dispatch = useDispatch()

  return cloneElement(render(), {
    onClick: () => dispatch(addQuestion()),
  })
}

export function DeleteQuestion({ render }: ElementRenderProp) {
  const dispatch = useDispatch()
  const { activeQuestion } = useSelector<AppStore, QuizState>(
    (state) => state.quiz
  )

  return cloneElement(render(), {
    onClick: () => dispatch(removeQuestion(activeQuestion)),
  })
}

export function DuplicateQuestion({ render }: ElementRenderProp) {
  const dispatch = useDispatch()
  const { activeQuestion } = useSelector<AppStore, QuizState>(
    (state) => state.quiz
  )

  return cloneElement(render(), {
    onClick: () => dispatch(duplicateQuestion(activeQuestion)),
  })
}

export function ChangeQuestionBackground() {
  const dispatch = useDispatch()
  const { isPublished } = useSelector<AppStore, QuizState>(
    (state) => state.quiz
  )
  const { setMessageOpen } = useContext(EditContext)

  const changeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = (e.target as HTMLInputElement).files

    if (!fileList || !fileList.length) return

    if (fileList[0].size > 2097152) {
      return setMessageOpen(true)
    }

    const base64 = await convertToBase64(fileList[0])
    dispatch(changeQuestionBackground(base64))
  }

  return (
    <label
      className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded bg-white shadow"
      htmlFor="question-background">
      <input
        accept=".png,.jpg,.jpeg"
        className="visually-hidden"
        disabled={isPublished}
        id="question-background"
        type="file"
        onChange={changeImage}
      />
      <AddPhoto width={1.25} />
    </label>
  )
}

export function ChangeQuestionPicture() {
  const dispatch = useDispatch()
  const { isPublished } = useSelector<AppStore, QuizState>(
    (state) => state.quiz
  )
  const { setMessageOpen } = useContext(EditContext)

  const changeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = (e.target as HTMLInputElement).files

    if (!fileList || !fileList.length) return

    if (fileList[0].size > 2097152) {
      return setMessageOpen(true)
    }

    const base64 = await convertToBase64(fileList[0])
    dispatch(changeQuestionPicture(base64))
  }

  return (
    <label className="relative z-10" htmlFor="question-picture">
      <input
        accept=".png,.jpg,.jpeg"
        className="visually-hidden"
        disabled={isPublished}
        id="question-picture"
        type="file"
        onChange={changeImage}
      />
      <div className="mb-5 flex h-14 w-14 cursor-pointer items-center justify-center rounded bg-secondary text-xl text-white">
        +
      </div>
    </label>
  )
}

export function EditQuestionName() {
  const { activeQuestion, isPublished } = useSelector<AppStore, QuizState>(
    (state) => state.quiz
  )
  const {
    register,
    formState: { errors },
  } = useFormContext<DraftQuizType>()

  return (
    <div>
      <Input
        className="w-[28.75rem] py-2 text-xl shadow-lg"
        disabled={isPublished}
        placeholder="Start typing your question..."
        isCentered
        {...register(`questions.${activeQuestion}.name`)}
      />
      <EditValidation
        error={errors.questions && errors.questions[activeQuestion]?.name}
      />
    </div>
  )
}

interface QuestionAnswerProps {
  type: "triangle" | "rhombus" | "circle" | "square"
}

const answerTypes: QuestionAnswerProps["type"][] = [
  "triangle",
  "rhombus",
  "circle",
  "square",
]
const answerComponents: Record<
  QuestionAnswerProps["type"],
  (_: AnswerProps) => ReactElement
> = {
  triangle: TriangleAnswer,
  rhombus: RhombusAnswer,
  circle: CircleAnswer,
  square: SquareAnswer,
}

export function QuestionAnswer({ type }: QuestionAnswerProps) {
  const { activeQuestion, isPublished } = useSelector<AppStore, QuizState>(
    (state) => state.quiz
  )
  const {
    formState: { errors },
  } = useFormContext<DraftQuizType>()

  const Component = answerComponents[type]
  const index = answerTypes.indexOf(type)

  return (
    <div>
      <Component activeQuestion={activeQuestion} isPublished={isPublished} />
      <EditValidation
        error={
          errors.questions &&
          errors.questions[activeQuestion]?.answers &&
          errors.questions[activeQuestion]!.answers![index]
        }
      />
      {index === 0 && (
        <EditValidation
          error={
            errors.questions &&
            errors.questions[activeQuestion]?.correctAnswers?.root
          }
        />
      )}
    </div>
  )
}
