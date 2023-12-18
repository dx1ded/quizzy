import { useState, useMemo, Children, Dispatch, SetStateAction } from "react"
import { ChildrenAsFunction } from "../../lib"

export interface MultistepProps<T> {
  data: T
  setData: Dispatch<SetStateAction<T>>
  setPrevStep(): void
  setNextStep(): void
}

export function Multistep<T = object>({
  children,
  defaultState = {} as T,
}: ChildrenAsFunction<MultistepProps<T>> & { defaultState?: T }) {
  const [data, setData] = useState<T>(defaultState)
  const [step, setStep] = useState(0)

  const invokedChildren = useMemo(
    () =>
      Children.toArray(
        children({
          data,
          setData,
          setPrevStep: () => setStep((prevState) => prevState - 1),
          setNextStep: () => setStep((prevState) => prevState + 1),
        }).props.children
      ),
    [children, data]
  )

  return invokedChildren[step]
}
