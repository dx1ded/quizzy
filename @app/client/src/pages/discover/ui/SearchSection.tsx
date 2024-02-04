import { QuizType } from "@quizzy/common"
import { useQuery } from "@tanstack/react-query"
import { ChangeEvent } from "react"
import { useSearchParams } from "react-router-dom"
import { useDebouncedCallback } from "use-debounce"
import { QuizItem } from "shared/ui/QuizItem"
import { useSecuredRequest } from "entities/account"
import { Subheading } from "shared/ui/Typography"
import { Input } from "shared/ui/Input"

export function SearchSection() {
  const request = useSecuredRequest()
  const [searchParams, setSearchParams] = useSearchParams()
  const { data, refetch } = useQuery({
    queryKey: ["searchQuizzes"],
    queryFn: (): Promise<QuizType[]> | never[] => {
      const name = searchParams.get("name")

      if (!name) return []

      return request(`/api/quiz/findBy?name=${name}`)
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
      <div className="mx-auto mt-16 grid max-w-3xl gap-2">
        <QuizItem
          creatorInfo={{
            username: "vovados1",
            avatar: "",
          }}
          quiz={{
            id: "sjadj21ji12o3ji",
            cover: "",
            name: "Quiz name",
            plays: 100,
            questionCount: 2,
          }}
          noEdit
        />
      </div>
      {/* {data && ( */}
      {/*  <div className="grid gap-2"> */}
      {/*    {data.map((quiz) => ( */}
      {/*      <div key={quiz.id}>{quiz.name}</div> */}
      {/*    ))} */}
      {/*  </div> */}
      {/* )} */}
    </section>
  )
}
