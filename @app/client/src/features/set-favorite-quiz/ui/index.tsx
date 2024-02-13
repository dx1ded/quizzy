import { useContext } from "react"
import { useSecuredRequest } from "entities/account"
import { QuizInfoContext } from "entities/quiz"
import { Star } from "shared/icons/Star"

export function SetFavoriteQuiz() {
  const request = useSecuredRequest()
  const { quiz, isFavorite, setIsFavorite } = useContext(QuizInfoContext)

  const clickHandler = () => {
    request("/api/quiz/set-favorite", {
      method: "PATCH",
      body: { id: quiz.id, favorite: !isFavorite },
    }).then(() => setIsFavorite(!isFavorite))
  }

  return (
    <button type="button" onClick={clickHandler}>
      <Star color={isFavorite ? "#FDB800" : "#FFFFFF"} width={1.5} />
    </button>
  )
}
