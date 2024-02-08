import { ChangeEvent, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Controller, useFormContext } from "react-hook-form"
import { Modal } from "@mui/material"
import { DraftQuizType } from "@quizzy/common"
import { changeCover, QuizState } from "entities/quiz"
import { Cross } from "shared/icons/Cross"
import { Edit } from "shared/icons/Edit"
import { Input } from "shared/ui/Input"
import { QuizzyImage } from "shared/ui/QuizzyImage"
import type { AppStore } from "app/model"
import { EditContext } from "../model"
import { convertToBase64 } from "../lib"
import { EditValidation } from "./EditValidation"

export function SettingsModal() {
  const dispatch = useDispatch()
  const { modalOpen, setModalOpen, setMessageOpen } = useContext(EditContext)
  const { data, isPublished } = useSelector<AppStore, QuizState>(
    (state) => state.quiz
  )
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<DraftQuizType>()

  const changeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = (e.target as HTMLInputElement).files

    if (!fileList || !fileList.length) return

    if (fileList[0].size > 2097152) {
      return setMessageOpen(true)
    }

    const base64 = await convertToBase64(fileList[0])
    dispatch(changeCover(base64))
  }

  return (
    <Modal
      className="flex items-center justify-center"
      open={modalOpen}
      onClose={() => setModalOpen(false)}>
      <div className="w-96 rounded bg-white shadow">
        <div className="relative">
          {data.cover ? (
            <img
              alt="Quiz"
              className="h-[7rem] w-full rounded-t object-cover"
              src={data.cover}
            />
          ) : (
            <QuizzyImage
              className="rounded-t"
              height="7rem"
              size={1.5}
              width="100%"
            />
          )}
          <label className="absolute right-2 top-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-white shadow">
            <input
              accept=".png,.jpg,.jpeg"
              className="visually-hidden"
              disabled={isPublished}
              id="question-background"
              type="file"
              onChange={changeHandler}
            />
            <Edit width={1} />
            <span className="visually-hidden">Change cover</span>
          </label>
          <button
            className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded bg-white shadow"
            type="button"
            onClick={() => setModalOpen(false)}>
            <Cross width={0.75} />
          </button>
        </div>
        <div className="p-4">
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <div>
                <Input
                  className="mb-2.5 w-full text-sm"
                  defaultValue={field.value}
                  disabled={isPublished}
                  placeholder="Enter quiz name"
                  onChange={(e) => field.onChange(e.target.value)}
                />
                <EditValidation error={errors.name} />
              </div>
            )}
          />
          <div>
            <textarea
              className="w-full resize-none rounded border border-gray px-2.5 py-1.5 text-sm outline-0"
              disabled={isPublished}
              placeholder="Enter quiz description"
              rows={6}
              {...register("description")}
            />
            <EditValidation error={errors.description} />
          </div>
        </div>
      </div>
    </Modal>
  )
}
