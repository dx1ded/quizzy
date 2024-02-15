import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useMemo,
  useState,
} from "react"

type JoinContextType = {
  pin: number
  setPin: Dispatch<SetStateAction<number>>
  nickname: string
  setNickname: Dispatch<SetStateAction<string>>
}

const defaultState: JoinContextType = {
  pin: -1,
  setPin() {},
  nickname: "",
  setNickname() {},
}

export const JoinContext = createContext(defaultState)

export function JoinContextProvider({ children }: PropsWithChildren) {
  const [pin, setPin] = useState(0)
  const [nickname, setNickname] = useState("")

  const defaultValue = useMemo(
    () => ({
      pin,
      setPin,
      nickname,
      setNickname,
    }),
    [pin, nickname]
  )

  return (
    <JoinContext.Provider value={defaultValue}>{children}</JoinContext.Provider>
  )
}
