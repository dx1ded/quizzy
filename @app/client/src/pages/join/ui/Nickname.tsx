import { useRef } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setNickname } from "entities/account"
import { Heading } from "shared/ui/Typography"
import { Input } from "shared/ui/Input"
import { Button } from "shared/ui/Button"

interface NicknameProps {
  pin: string
}

export function Nickname({ pin }: NicknameProps) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)

  const clickHandler = () => {
    if (!inputRef.current) return

    const { value } = inputRef.current

    dispatch(setNickname(value))
    navigate(`/play?sessionId=${pin}`)
  }

  return (
    pin && (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-5 bg-primary">
        <Heading className="font-lobster text-5xl text-white">
          Almost in!
        </Heading>
        <div className="flex w-96 flex-col gap-2.5 rounded-xl bg-white p-4">
          <Input
            ref={inputRef}
            className="rounded-lg py-2 font-semibold"
            placeholder="Nickname"
            variant="secondary"
            width={100}
            isCentered
          />
          <Button
            className="rounded-lg py-2 font-semibold"
            variant="secondary"
            onClick={clickHandler}>
            Let's go!
          </Button>
        </div>
      </div>
    )
  )
}
