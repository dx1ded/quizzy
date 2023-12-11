import { PropsWithChildren } from "react"

export function Container({ children }: PropsWithChildren) {
  return <div className="container-[72rem] mx-auto px-5">{children}</div>
}
