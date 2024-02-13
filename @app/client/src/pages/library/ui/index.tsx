import { useState } from "react"
import Skeleton from "react-loading-skeleton"
import { SearchQuizzesType } from "@quizzy/common"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Trash } from "shared/icons/Trash"
import { ConfirmModal } from "shared/ui/ConfirmModal"
import { AppHeader } from "widgets/header"
import { Screen } from "widgets/screen"
import { QuizItem } from "features/search-quiz"
import { useSecuredRequest } from "entities/account"
import { Button } from "shared/ui/Button"
import { Box } from "shared/ui/Box"
import { Heading, Text } from "shared/ui/Typography"

export function Library() {
  const request = useSecuredRequest()
  // Selected ids
  const [selected, setSelected] = useState<string[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  // Set small / expanded view
  const [view, setView] = useState<"expanded" | "small">("expanded")
  const [options, setOptions] = useState([
    { name: "Recent", isActive: true, url: "/api/quiz/search/recent" },
    { name: "Drafts", isActive: false, url: "/api/quiz/search/draft" },
    { name: "Favorites", isActive: false, url: "/api/quiz/search/favorite" },
  ])

  const { data, fetchNextPage, hasNextPage, isLoading, isError, refetch } =
    useInfiniteQuery({
      queryKey: ["libraryQuizzes", options],
      queryFn: ({ pageParam = 1 }) => {
        const { url } = options.find((option) => option.isActive)!

        return request<SearchQuizzesType>(`${url}?perPage=5&page=${pageParam}`)
      },
      getNextPageParam: (lastPage, allPages) =>
        lastPage.quizzes.length < 5 ? undefined : allPages.length + 1,
      initialPageParam: 1,
      retry: false,
      refetchOnWindowFocus: false,
    })

  const optionClickHandler = (i: number) => {
    setOptions((prevState) =>
      prevState.map((option, index) => ({ ...option, isActive: i === index }))
    )
  }

  const deleteSelected = () => {
    request("/api/quiz/deleteMany", {
      method: "DELETE",
      body: { ids: selected },
    }).then(() => refetch())

    setModalOpen(false)
  }

  return (
    <div className="pt-2">
      <AppHeader />
      <Screen>
        <Box className="flex-1">
          {/* Delete all confirm modal */}
          <ConfirmModal
            buttonText="Delete"
            description="Deleting the quizzes you will not be able to restore them anymore. Are you sure with your decision?"
            isOpen={modalOpen}
            setIsOpen={setModalOpen}
            title="Are you sure you want to delete the quizzes?"
            onConfirm={deleteSelected}
          />
          <div className="mb-5 flex items-center justify-between">
            <Heading>Library</Heading>
            {!!selected.length && (
              <button
                className="flex items-center gap-1.5 text-sm font-bold text-red-500"
                type="button"
                onClick={() => setModalOpen(true)}>
                <Trash width={0.75} />
                Trash
              </button>
            )}
          </div>
          <div className="mb-8 flex items-center justify-between rounded border border-gray px-2.5 py-2">
            <div className="flex gap-3">
              {options.map((option, i) => (
                <Button
                  key={i}
                  className="px-5"
                  size="md"
                  variant={option.isActive ? "secondary" : "white"}
                  onClick={() => optionClickHandler(i)}>
                  {option.name}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <button
                aria-label="Smaller"
                className={`${
                  view === "small" ? "text-secondary" : "text-gray"
                } flex w-7 flex-col gap-[0.2rem]`}
                type="button"
                onClick={() => setView("small")}>
                <span className="h-[0.175rem] w-full bg-current" aria-hidden />
                <span className="h-[0.175rem] w-full bg-current" aria-hidden />
              </button>
              <button
                aria-label="Expanded"
                className={`${
                  view === "expanded" ? "text-secondary" : "text-gray"
                } flex w-7 flex-col gap-[0.2rem]`}
                type="button"
                onClick={() => setView("expanded")}>
                <span className="h-[0.175rem] w-full bg-current" aria-hidden />
                <span className="h-[0.175rem] w-full bg-current" aria-hidden />
                <span className="h-[0.175rem] w-full bg-current" aria-hidden />
              </button>
            </div>
          </div>
          <div className="mb-4 flex flex-col gap-4">
            {isLoading ? (
              <>
                <Skeleton height="5rem" />
                <Skeleton height="5rem" />
                <Skeleton height="5rem" />
              </>
            ) : data?.pages && !isError ? (
              data?.pages.map((page) =>
                page.quizzes.map((quiz, i) => (
                  <QuizItem
                    key={quiz.id}
                    creatorInfo={page.creatorInfo[i]}
                    isCreator={page.isCreator[i]}
                    isExpanded={view === "expanded"}
                    quiz={quiz}
                    refetch={refetch}
                    setSelected={setSelected}
                  />
                ))
              )
            ) : (
              <Text className="text-center font-semibold">No data</Text>
            )}
          </div>
          {hasNextPage && (
            <div className="flex justify-center">
              <Button
                className="px-6"
                size="md"
                variant="white"
                onClick={() => fetchNextPage()}>
                Load more
              </Button>
            </div>
          )}
        </Box>
      </Screen>
    </div>
  )
}
