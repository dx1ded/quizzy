import { ChangeEvent, useEffect, useRef } from "react"
import { useSearchParams } from "react-router-dom"
import { useDebouncedCallback } from "use-debounce"
import { SearchQuizzesType } from "@quizzy/common"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Button } from "shared/ui/Button"
import { useSecuredRequest } from "entities/account"
import { Subheading } from "shared/ui/Typography"
import { Input } from "shared/ui/Input"
import { QuizItem } from "./QuizItem"

export function SearchSection() {
  const request = useSecuredRequest()
  const inputRef = useRef<HTMLInputElement>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["searchQuizzes", searchParams.get("name")],
    queryFn: ({ pageParam = 1 }) => {
      const name = searchParams.get("name")

      if (!name) return Promise.reject(new Error("No name"))

      return request<SearchQuizzesType>(
        `/api/quiz/search?perPage=5&page=${pageParam}&name=${name}`
      )
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.quizzes.length < 5 ? undefined : allPages.length + 1,
    initialPageParam: 1,
    retry: false,
  })

  const debouncedChangeHandler = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      searchParams.set("name", e.target.value)
      setSearchParams(searchParams)
    },
    1000
  )

  useEffect(() => {
    if (searchParams.get("scroll") && inputRef.current) {
      inputRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "nearest",
      })
    }
  }, [searchParams])

  return (
    <section className="rounded bg-accent py-20 text-center">
      <Subheading className="mb-6 text-white">Search for</Subheading>
      <Input
        key={searchParams.get("name")!}
        ref={inputRef}
        className="inline-block w-[30rem] rounded-lg border-none py-2"
        defaultValue={searchParams.get("name")!}
        id="search"
        placeholder="Search for public quizzes"
        withMagnifier
        onChange={debouncedChangeHandler}
      />
      {data?.pages && (
        <>
          <div className="mx-auto mt-16 grid max-w-3xl gap-3">
            {data?.pages.map((page) =>
              page.quizzes.map((quiz) => (
                <QuizItem
                  key={quiz.id}
                  creatorInfo={
                    page.creatorInfo.find((i) => i.id === quiz.userRef)!
                  }
                  quiz={quiz}
                  noEdit
                />
              ))
            )}
          </div>
          {hasNextPage && (
            <div className="mt-4 flex justify-center">
              <Button
                className="px-6"
                size="md"
                variant="white"
                onClick={() => fetchNextPage()}>
                Load more
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  )
}
