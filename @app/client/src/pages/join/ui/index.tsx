import { useState } from "react"
import { GamePin } from "./GamePin"
import { Nickname } from "./Nickname"

export function Join() {
  const [pin, setPin] = useState("")

  return !pin ? <GamePin setPin={setPin} /> : <Nickname pin={pin} />
}
