import { Dispatch, SetStateAction } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { GetAccountInfo } from "@quizzy/common"
import type { AppStore } from "app/model"
import {
  AccountState,
  setId,
  setNickname,
  useSecuredRequest,
} from "entities/account"
import { Caption, Heading } from "shared/ui/Typography"
import { Input } from "shared/ui/Input"
import { Button } from "shared/ui/Button"
import { GamePinSchema, GamePinType } from "../lib"

interface GamePinProps {
  setPin: Dispatch<SetStateAction<string>>
}

export function GamePin({ setPin }: GamePinProps) {
  const request = useSecuredRequest()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token } = useSelector<AppStore, AccountState>(
    (state) => state.account
  )
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<GamePinType>({
    resolver: zodResolver(GamePinSchema),
  })

  const submitHandler: SubmitHandler<GamePinType> = async (data) => {
    const pin = data.pin.replaceAll(" ", "")

    const req = await fetch("/api/play/exists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId: pin }),
    })
    const sessionExists = (await req.json()) as Promise<boolean>

    if (!sessionExists)
      return setError("pin", {
        message: "Session doesn't exist",
      })

    if (token) {
      const user = await request<GetAccountInfo>("/api/auth/get-info")

      if (user) {
        dispatch(setId(user.id))
        dispatch(setNickname(user.username))
        return navigate(`/play?sessionId=${pin}`)
      }
    }

    setPin(pin)
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5 bg-primary">
      <Heading className="font-lobster text-5xl text-white">
        Quizzy Time!
      </Heading>
      <div className="flex w-96 flex-col gap-2.5 rounded-xl bg-white p-4">
        <Input
          className="rounded-lg py-2 font-semibold"
          placeholder="Game PIN"
          variant="secondary"
          isCentered
          {...register("pin")}
        />
        {errors.pin && (
          <Caption className="text-red-600">{errors.pin.message}</Caption>
        )}
        <Button
          className="rounded-lg py-2 font-semibold"
          variant="secondary"
          onClick={handleSubmit(submitHandler)}>
          Enter
        </Button>
      </div>
    </div>
  )
}
