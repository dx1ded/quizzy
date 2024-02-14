import { ChangeEvent, useState } from "react"
import { useSearchParams } from "react-router-dom"
import Skeleton from "react-loading-skeleton"
import { useDebouncedCallback } from "use-debounce"
import { GetRecordsType } from "@quizzy/common"
import { useInfiniteQuery } from "@tanstack/react-query"
import { AppHeader } from "widgets/header"
import { Screen } from "widgets/screen"
import { useSecuredRequest } from "entities/account"
import { ConfirmModal } from "shared/ui/ConfirmModal"
import { Trash } from "shared/icons/Trash"
import { Button } from "shared/ui/Button"
import { Checkbox } from "shared/ui/Checkbox"
import { Input } from "shared/ui/Input"
import { Heading } from "shared/ui/Typography"
import { Box } from "shared/ui/Box"
import { Record } from "./Record"

export interface SelectedState {
  checked: boolean
  ids: string[]
}

export function Records() {
  const request = useSecuredRequest()
  const [searchParams, setSearchParams] = useSearchParams()
  const [selected, setSelected] = useState<SelectedState>({
    checked: false,
    ids: [],
  })
  const [modalOpen, setModalOpen] = useState(false)
  const { data, fetchNextPage, hasNextPage, isLoading, refetch } =
    useInfiniteQuery({
      queryKey: ["reportsQuizzes", searchParams.get("quizName")],
      queryFn: ({ pageParam = 1 }) => {
        const quizName = searchParams.get("quizName")

        if (quizName) {
          return request<GetRecordsType>(
            `/api/record/search?perPage=5&page=${pageParam}&quizName=${quizName}`
          )
        }

        return request<GetRecordsType>(
          `/api/record/list?perPage=5&page=${pageParam}`
        )
      },
      getNextPageParam: (lastPage, allPages) =>
        lastPage.records.length < 5 ? undefined : allPages.length + 1,
      initialPageParam: 1,
      retry: false,
      refetchOnWindowFocus: false,
      throwOnError: false,
    })

  const debouncedChangeHandler = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchParams({ quizName: e.target.value })
      setSelected({ checked: false, ids: [] })
    },
    1000
  )

  const deleteMany = () => {
    request("/api/record/deleteMany", {
      method: "DELETE",
      body: { ids: selected.ids },
    }).then(() => refetch())

    setModalOpen(false)
    setSelected({ checked: false, ids: [] })
  }

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSelected((prevState) => ({ ...prevState, checked: e.target.checked }))
  }

  return (
    <div className="pt-2">
      {/* Confirm modal */}
      <ConfirmModal
        buttonText="Delete"
        description="Are you sure you want to delete the selected records? You won't be able to restore it."
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        title="Delete the selected records?"
        onConfirm={deleteMany}
      />
      <AppHeader />
      <Screen>
        <Box className="flex-1">
          <Heading className="mb-5">Records</Heading>
          <div className="mb-8 flex items-center justify-between border-b border-gray pb-5">
            <Input
              className="w-80 rounded-md py-1.5 pl-5 text-sm"
              defaultValue={searchParams.get("quizName") || ""}
              placeholder="Search"
              onChange={debouncedChangeHandler}
            />
            {!!selected.ids.length && (
              <button
                className="flex items-center gap-1.5 text-sm font-bold text-red-500"
                type="button"
                onClick={() => setModalOpen(true)}>
                <Trash width={0.75} />
                Trash
              </button>
            )}
          </div>
          <div className="mb-4 text-sm font-semibold">
            <div className="grid grid-cols-reports-table items-center gap-4 rounded-t bg-primary px-3 py-3.5 text-white">
              <div>
                <Checkbox
                  checkboxClassName="border-white"
                  checked={selected.checked}
                  className="align-middle"
                  name="report-checkbox"
                  onChange={changeHandler}
                />
              </div>
              <span>Name</span>
              <span>Date</span>
              <span>No. of players</span>
              <span />
            </div>
            <div className="rounded-b border border-gray">
              {isLoading ? (
                <>
                  <Skeleton height="3rem" />
                  <Skeleton height="3rem" />
                  <Skeleton height="3rem" />
                </>
              ) : data?.pages[0].records.length ? (
                data?.pages.map((page) =>
                  page.records.map((record, i) => (
                    <Record
                      key={record.id}
                      date={record.date}
                      id={record.id}
                      isCreator={page.isCreator[i]}
                      numberOfPlayers={record.playersIds.length}
                      quizName={record.quizName}
                      refetch={refetch}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  ))
                )
              ) : (
                <div className="py-3.5 text-center">
                  <span className="text-[0.875rem] font-semibold">No data</span>
                </div>
              )}
            </div>
            {hasNextPage && (
              <div className="mt-4 flex justify-center">
                <Button
                  className="px-5"
                  size="md"
                  variant="white"
                  onClick={() => fetchNextPage()}>
                  Load more
                </Button>
              </div>
            )}
          </div>
        </Box>
      </Screen>
    </div>
  )
}
