import { useContext, useRef } from "react"
import { Heading } from "shared/ui/Typography"
import { Input } from "shared/ui/Input"
import { Button } from "shared/ui/Button"
import { JoinContext } from "../model"

export function GamePin() {
  const { pin, setPin } = useContext(JoinContext)
  const inputRef = useRef<HTMLInputElement>(null)

  const clickHandler = () => {
    if (!inputRef.current) return

    const { value } = inputRef.current

    setPin(+value)
  }

  return (
    !pin && (
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
  )
}
