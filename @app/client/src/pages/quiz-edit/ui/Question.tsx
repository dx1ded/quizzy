import { ChangeEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useFormContext } from "react-hook-form"
import { QuizType } from "@quizzy/common"
import { Snackbar } from "@mui/material"
import QuizBackground from "assets/quiz-background.png"
import {
  changeQuestionBackground,
  changeQuestionPicture,
  QuizState,
} from "entities/quiz"
import { Input } from "shared/ui/Input"
import { Text } from "shared/ui/Typography"
import {
  CircleAnswer,
  RhombusAnswer,
  SquareAnswer,
  TriangleAnswer,
} from "shared/ui/Answer"
import type { AppStore } from "app/model"
import { AddPhoto } from "shared/icons/AddPhoto"
import { convertToBase64 } from "../model"

export function Question() {
  const dispatch = useDispatch()
  const { activeQuestion } = useSelector<AppStore, QuizState>(
    (state) => state.quiz
  )
  const { register, watch } = useFormContext<QuizType>()
  const [open, setOpen] = useState(false)

  const question = watch("questions")[activeQuestion]

  const changeImage = async (
    e: ChangeEvent<HTMLInputElement>,
    type: "picture" | "background"
  ) => {
    const fileList = (e.target as HTMLInputElement).files

    if (!fileList || !fileList.length) return

    if (fileList[0].size > 2097152) {
      return setOpen(true)
    }

    const base64 = await convertToBase64(fileList[0])
    const action =
      type === "picture" ? changeQuestionPicture : changeQuestionBackground
    dispatch(action(base64))
  }

  return (
    <main className="relative flex-1">
      <Snackbar
        autoHideDuration={5000}
        message="File should be less than 2MB"
        open={open}
        onClose={() => setOpen(false)}
      />
      <img
        alt="Quiz"
        className="absolute left-0 top-0 -z-10 h-full w-full object-cover"
        src={
          question.background
            ? `data:image/png;base64, ${question.background}`
            : QuizBackground
        }
      />
      <label
        className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded bg-white shadow"
        htmlFor="question-background">
        <input
          accept=".png,.jpg,.jpeg"
          className="visually-hidden"
          id="question-background"
          type="file"
          onChange={(e) => changeImage(e, "background")}
        />
        <AddPhoto width={1.25} />
      </label>
      <div className="flex h-full flex-col items-center justify-between px-5 py-10">
        <Input
          className="w-[28.75rem] py-2 text-xl shadow-lg"
          placeholder="Start typing your question..."
          value={question.name}
          isCentered
          {...register(`questions.${activeQuestion}.name`)}
        />
        <div className="relative flex h-80 w-96 flex-col items-center justify-center rounded bg-white shadow-lg">
          {question.picture && (
            <img
              alt="Quiz question"
              className="absolute left-0 top-0 z-0 h-full w-full rounded object-cover"
              src={`data:image/png;base64, ${question.picture}`}
            />
          )}
          <label className="relative z-10" htmlFor="question-picture">
            <input
              accept=".png,.jpg,.jpeg"
              className="visually-hidden"
              id="question-picture"
              type="file"
              onChange={(e) => changeImage(e, "picture")}
            />
            <div className="mb-5 flex h-14 w-14 cursor-pointer items-center justify-center rounded bg-secondary text-xl text-white">
              +
            </div>
          </label>
          <Text className="font-bold">Find or insert media</Text>
        </div>
        <div className="grid w-full grid-cols-2 gap-4">
          <TriangleAnswer
            activeQuestion={activeQuestion}
            isChecked={question.correctAnswers[0]}
            value={question.answers[0]}
          />
          <RhombusAnswer
            activeQuestion={activeQuestion}
            isChecked={question.correctAnswers[1]}
            value={question.answers[1]}
          />
          <CircleAnswer
            activeQuestion={activeQuestion}
            isChecked={question.correctAnswers[2]}
            value={question.answers[2]}
          />
          <SquareAnswer
            activeQuestion={activeQuestion}
            isChecked={question.correctAnswers[3]}
            value={question.answers[3]}
          />
        </div>
      </div>
    </main>
  )
}
