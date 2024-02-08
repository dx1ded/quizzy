import { useSelector } from "react-redux"
import { Controller, useFormContext } from "react-hook-form"
import { MenuItem, Select } from "@mui/material"
import { DraftQuizType } from "@quizzy/common"
import { DeleteQuestion, DuplicateQuestion } from "features/edit-quiz"
import { Button } from "shared/ui/Button"
import { QuizState } from "entities/quiz"
import type { AppStore } from "app/model"

interface SettingsProps {
  submit: () => void
}

export function Settings({ submit }: SettingsProps) {
  const { activeQuestion, isPublished } = useSelector<AppStore, QuizState>(
    (state) => state.quiz
  )
  const { control, getValues } = useFormContext<DraftQuizType>()
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
              disabled={isPublished}
              sx={{
                "& .MuiSelect-select": {
                  padding: "0.5rem 1rem",
                },
              }}
              value={question.timeLimit}
              fullWidth
              onChange={(e) => {
                field.onChange(e.target.value)
                submit()
              }}>
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
              disabled={isPublished}
              sx={{
                "& .MuiSelect-select": {
                  padding: "0.5rem 1rem",
                },
              }}
              type="select"
              value={question.points}
              fullWidth
              onChange={(e) => {
                field.onChange(e.target.value)
                submit()
              }}>
              <MenuItem value={1}>Standard</MenuItem>
              <MenuItem value={2}>More (+1)</MenuItem>
              <MenuItem value={3}>More (+2)</MenuItem>
            </Select>
          )}
        />
      </div>
      <div className="mt-auto flex flex-col gap-2.5 border-t border-gray pt-3">
        <DeleteQuestion
          render={() => (
            <Button disabled={isPublished} size="md" variant="white">
              Delete
            </Button>
          )}
        />
        <DuplicateQuestion
          render={() => (
            <Button disabled={isPublished} size="md" variant="secondary">
              Duplicate
            </Button>
          )}
        />
      </div>
    </aside>
  )
}
