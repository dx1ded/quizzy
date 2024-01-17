import { PropsWithChildren } from "react"
import { Sidebar } from "shared/ui/Sidebar"
import { Container } from "shared/ui/Container"

export function Screen({ children }: PropsWithChildren) {
  return (
    <main>
      <Container className="flex" maxWidth={86}>
        <Sidebar />
        <div className="flex flex-1 items-start gap-8 pb-8 pl-9 pt-5">
          {children}
        </div>
      </Container>
    </main>
  )
}
