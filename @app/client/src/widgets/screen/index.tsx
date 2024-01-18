import { PropsWithChildren } from "react"
import { Sidebar } from "shared/ui/Sidebar"
import { Container } from "shared/ui/Container"
import { PropsWithClassname } from "shared/lib"

export function Screen({
  children,
  className,
}: PropsWithChildren<PropsWithClassname>) {
  const screenClassName = `flex flex-1 min-w-0 items-start gap-8 pb-8 pl-9 pt-5 ${
    className || ""
  }`

  return (
    <main>
      <Container className="flex" maxWidth={86}>
        <Sidebar />
        <div className={screenClassName}>{children}</div>
      </Container>
    </main>
  )
}
