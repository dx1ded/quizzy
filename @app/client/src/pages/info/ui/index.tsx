import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ThunkDispatch } from "redux-thunk"
import { useParams } from "react-router-dom"
import { AppHeader } from "widgets/header"
import { Screen } from "widgets/screen"
import { AppActions, AppStore } from "entities"
import { loadQuiz, QuizState } from "entities/quiz"
import { NotFound } from "shared/ui/NotFound"
import { Quiz } from "./Quiz"
import { Questions } from "./Questions"

export function Info() {
  const { id } = useParams()
  const { hasError } = useSelector<AppStore, QuizState>((state) => state.quiz)
  const dispatch = useDispatch<ThunkDispatch<AppStore, unknown, AppActions>>()

  useEffect(() => {
    dispatch(loadQuiz(id!))
  }, [id, dispatch])

  if (hasError) return <NotFound />

  return (
    <div className="pt-2">
      <AppHeader />
      <Screen>
        <Quiz />
        <Questions />
      </Screen>
    </div>
  )
}
