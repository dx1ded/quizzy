import { useDispatch, useSelector } from "react-redux"
import { useSecuredRequest } from "entities/account"
import { QuizState, setIsFavorite } from "entities/quiz"
import { Star } from "shared/icons/Star"
import type { AppStore } from "app/model"

export function SetFavoriteQuiz() {
  const request = useSecuredRequest()
  const dispatch = useDispatch()
  const { isFavorite, data } = useSelector<AppStore, QuizState>(
    (state) => state.quiz
  )

  const clickHandler = () => {
    request("/api/quiz/set-favorite", {
      method: "PATCH",
      body: { id: data.id, favorite: !isFavorite },
    }).then(() => dispatch(setIsFavorite(!isFavorite)))
  }

  return (
    <button type="button" onClick={clickHandler}>
      <Star color={isFavorite ? "#FDB800" : "#FFFFFF"} width={1.5} />
    </button>
  )
}
