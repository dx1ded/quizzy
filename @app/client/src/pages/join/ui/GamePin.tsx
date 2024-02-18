import { GetAccountInfo } from "@quizzy/common"
import { Dispatch, SetStateAction, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import type { AppStore } from "app/model"
import {
  AccountState,
  setId,
  setNickname,
  useSecuredRequest,
} from "entities/account"
import { Heading } from "shared/ui/Typography"
import { Input } from "shared/ui/Input"
import { Button } from "shared/ui/Button"

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
  const inputRef = useRef<HTMLInputElement>(null)

  const clickHandler = async () => {
    if (!inputRef.current) return

    const { value } = inputRef.current
    const req = await fetch("/api/play/exists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId: value }),
    })
    const sessionExists = (await req.json()) as Promise<boolean>

    if (!sessionExists) return alert("Session doesn't exist")

    if (token) {
      const user = await request<GetAccountInfo>("/api/auth/get-info")

      if (user) {
        dispatch(setId(user.id))
        dispatch(setNickname(user.username))
        return navigate(`/play?sessionId=${value}`)
      }
    }

    setPin(value)
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5 bg-primary">
      <Heading className="font-lobster text-5xl text-white">
        Quizzy Time!
      </Heading>
      <div className="flex w-96 flex-col gap-2.5 rounded-xl bg-white p-4">
        <Input
          ref={inputRef}
          className="rounded-lg py-2 font-semibold"
          placeholder="Game PIN"
          variant="secondary"
          width={100}
          isCentered
        />
        <Button
          className="rounded-lg py-2 font-semibold"
          variant="secondary"
          onClick={clickHandler}>
          Enter
        </Button>
      </div>
    </div>
  )
}
