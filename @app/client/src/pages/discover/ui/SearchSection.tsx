import { ChangeEvent } from "react"
import { useSearchParams } from "react-router-dom"
import { useDebouncedCallback } from "use-debounce"
import { SearchQuizzesType } from "@quizzy/common"
import { useQuery } from "@tanstack/react-query"
import { QuizItem } from "shared/ui/QuizItem"
import { useSecuredRequest } from "entities/account"
import { Subheading } from "shared/ui/Typography"
import { Input } from "shared/ui/Input"

export function SearchSection() {
  const request = useSecuredRequest()
  const [searchParams, setSearchParams] = useSearchParams()
  const { data, refetch } = useQuery({
    queryKey: ["searchQuizzes"],
    queryFn: () => {
      const name = searchParams.get("name")

      if (!name) return

      return request<SearchQuizzesType>(
        `/api/quiz/searchBy?perPage=5&page=1&name=${name}`
      )
    },
  })

  const debouncedChangeHandler = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      searchParams.set("name", e.target.value)
      setSearchParams(searchParams)
      refetch()
    },
    1500
  )

  return (
    <section className="rounded bg-accent py-20 text-center">
      <Subheading className="mb-6 text-white">Search for</Subheading>
      <Input
        className="inline-block w-[30rem] rounded-lg border-none py-2"
        defaultValue={searchParams.get("name") || ""}
        placeholder="Search for public quizzes"
        withMagnifier
        onChange={debouncedChangeHandler}
      />
      {data && data.quizzes && (
        <div className="mx-auto mt-16 grid max-w-3xl gap-2">
          {data.quizzes.map((quiz) => (
            <QuizItem
              creatorInfo={data.creatorInfo.find((i) => i.id === quiz.userRef)!}
              quiz={quiz}
              noEdit
            />
          ))}
        </div>
      )}
    </section>
  )
}
