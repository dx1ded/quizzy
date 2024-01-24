import { MenuItem, Select } from "@mui/material"
import { Controller, useFormContext } from "react-hook-form"
import { QuizType } from "@quizzy/common"
import { useDispatch } from "react-redux"
import { Button } from "shared/ui/Button"
import { duplicateQuestion, removeQuestion } from "entities/quiz"
import { QuizParams } from "./index"

export function Settings({ activeQuestion }: QuizParams) {
  const dispatch = useDispatch()
  const { control, getValues } = useFormContext<QuizType>()
  const question = getValues().questions[activeQuestion]

  return (
    <aside className="flex basis-48 flex-col px-3 pb-1 pt-4">
      <div className="mb-5">
        <p className="mb-1.5 font-bold">Time limit</p>
        <Controller
          control={control}
          name={`questions.${activeQuestion}.timeLimit`}
          render={({ field }) => (
            <Select
              sx={{
                "& .MuiSelect-select": {
                  padding: "0.5rem 1rem",
                },
              }}
              value={question.timeLimit}
              fullWidth
              onChange={(value) => field.onChange(value)}>
              <MenuItem value={10}>10 sec</MenuItem>
              <MenuItem value={20}>20 sec</MenuItem>
              <MenuItem value={30}>30 sec</MenuItem>
            </Select>
          )}
        />
      </div>
      <div className="mb-5">
        <p className="mb-1.5 font-bold">Points</p>
        <Controller
          control={control}
          name={`questions.${activeQuestion}.points`}
          render={({ field }) => (
            <Select
              sx={{
                "& .MuiSelect-select": {
                  padding: "0.5rem 1rem",
                },
              }}
              value={question.points}
              fullWidth
              onChange={(value) => field.onChange(value)}>
              <MenuItem value={1}>Standard</MenuItem>
              <MenuItem value={2}>More (+1)</MenuItem>
              <MenuItem value={3}>More (+2)</MenuItem>
            </Select>
          )}
        />
      </div>
      <div className="mt-auto flex flex-col gap-2.5 border-t border-gray pt-3">
        <Button
          size="md"
          variant="white"
          onClick={() => dispatch(removeQuestion(activeQuestion))}>
          Delete
        </Button>
        <Button
          size="md"
          variant="secondary"
          onClick={() => dispatch(duplicateQuestion(activeQuestion))}>
          Duplicate
        </Button>
      </div>
    </aside>
  )
}
