import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { setNickname } from "entities/account"
import { Caption, Heading } from "shared/ui/Typography"
import { Input } from "shared/ui/Input"
import { Button } from "shared/ui/Button"
import { NicknameSchema, NicknameType } from "../lib"

interface NicknameProps {
  pin: string
}

export function Nickname({ pin }: NicknameProps) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NicknameType>({
    resolver: zodResolver(NicknameSchema),
  })

  const submitHandler: SubmitHandler<NicknameType> = (data) => {
    dispatch(setNickname(data.nickname))
    navigate(`/play?sessionId=${pin}`)
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5 bg-primary">
      <Heading className="font-lobster text-5xl text-white">Almost in!</Heading>
      <div className="flex w-96 flex-col gap-2.5 rounded-xl bg-white p-4">
        <Input
          className="rounded-lg py-2 font-semibold"
          placeholder="Nickname"
          variant="secondary"
          isCentered
          {...register("nickname")}
        />
        {errors.nickname && (
          <Caption className="text-red-600">{errors.nickname.message}</Caption>
        )}
        <Button
          className="rounded-lg py-2 font-semibold"
          variant="secondary"
          onClick={handleSubmit(submitHandler)}>
          Let's go!
        </Button>
      </div>
    </div>
  )
}
