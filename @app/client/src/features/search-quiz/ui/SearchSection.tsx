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
    <section className="rounded bg-accent px-5 py-20 lg:py-14 md:py-10 sm:px-3">
      <Subheading className="mb-6 text-center text-white">
        Search for
      </Subheading>
      <Input
        key={searchParams.get("name")!}
        ref={inputRef}
        className="w-full rounded-lg border-none py-2"
        containerClassName="max-w-[30rem] mx-auto"
        defaultValue={searchParams.get("name")!}
        id="search"
        placeholder="Search for public quizzes"
        withMagnifier
        onChange={debouncedChangeHandler}
      />
      {data?.pages && (
        <>
          <div className="mx-auto mt-16 grid max-w-3xl gap-3">
            {data?.pages.map((page, i) =>
              page.quizzes.map((quiz) => (
                <QuizItem
                  key={quiz.id}
                  creatorInfo={page.creatorInfo[i]}
                  isCreator={page.isCreator[i]}
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
