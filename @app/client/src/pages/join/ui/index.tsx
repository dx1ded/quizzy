import { JoinContextProvider } from "../model"
import { GamePin } from "./GamePin"
import { Nickname } from "./Nickname"

export function Join() {
  return (
    <JoinContextProvider>
      <GamePin />
      <Nickname />
    </JoinContextProvider>
  )
}
