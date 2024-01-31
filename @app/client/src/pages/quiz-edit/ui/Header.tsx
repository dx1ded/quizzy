import { ChangeEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { Controller, useFormContext } from "react-hook-form"
import { QuizType } from "@quizzy/common"
import { Modal, Snackbar } from "@mui/material"
import { changeCover, QuizState } from "entities/quiz"
import { Logo } from "shared/ui/Logo"
import { Input } from "shared/ui/Input"
import { Button } from "shared/ui/Button"
import type { AppStore } from "app/model"
import { QuizzyImage } from "shared/ui/QuizzyImage"
import { Edit } from "shared/icons/Edit"
import { Cross } from "shared/icons/Cross"
import { convertToBase64 } from "../model"

export function Header() {
  const dispatch = useDispatch()
  const { data } = useSelector<AppStore, QuizState>((state) => state.quiz)
  const [modalOpen, setModalOpen] = useState(false)
  const [messageOpen, setMessageOpen] = useState(false)

  const { register, control } = useFormContext<QuizType>()

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
    <header className="flex items-center bg-white px-6 py-2 shadow">
      <Snackbar
        autoHideDuration={5000}
        message="File should be less than 2MB"
        open={messageOpen}
        onClose={() => setModalOpen(false)}
      />
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
                src={`data:image/png;base64, ${data.cover}`}
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
                <Input
                  className="mb-2.5 w-full text-sm"
                  defaultValue={field.value}
                  placeholder="Enter quiz name"
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
            <textarea
              className="w-full resize-none rounded border border-gray px-2.5 py-1.5 text-sm outline-0"
              placeholder="Enter quiz description"
              rows={6}
              {...register("description")}
            />
          </div>
        </div>
      </Modal>
      <Logo as={NavLink} className="mr-6" size={2.75} to="/app" />
      <Input
        className="w-60"
        placeholder="Enter quiz name"
        {...register("name")}
      />
      <Button className="ml-auto mr-4 px-8" variant="white">
        Delete
      </Button>
      <Button
        className="px-8"
        variant="secondary"
        onClick={() => setModalOpen(true)}>
        Settings
      </Button>
    </header>
  )
}
