import { GetQuizType } from "@quizzy/common"
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react"

interface QuizInfoContextType extends GetQuizType {
  isLoading: boolean
  setIsFavorite: Dispatch<SetStateAction<boolean>>
}

const initialState: QuizInfoContextType = {
  quiz: {
    id: "",
    userRef: -1,
    name: "",
    description: "",
    cover: "",
    questions: [],
    rating: 0,
    plays: 0,
    favoriteBy: [],
  },
  creatorInfo: {
    username: "",
    picture: "",
  },
  isCreator: false,
  isFavorite: false,
  isLoading: true,
  setIsFavorite() {},
}

export const QuizInfoContext = createContext<QuizInfoContextType>(initialState)

export function QuizInfoProvider({
  children,
  value,
}: PropsWithChildren<{ value: GetQuizType & { isLoading: boolean } }>) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    setIsFavorite(value.isFavorite)
  }, [value.isFavorite])

  const contextValue = useMemo(
    () => ({
      ...value,
      isFavorite,
      setIsFavorite,
    }),
    [isFavorite, value]
  )

  return (
    <QuizInfoContext.Provider value={contextValue}>
      {children}
    </QuizInfoContext.Provider>
  )
}
