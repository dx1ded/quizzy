import { ChangeEvent } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { useDebouncedCallback } from "use-debounce"
import { Input } from "shared/ui/Input"

export function HeaderSearch() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()

  const debouncedChangeHandler = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target

      if (location.pathname !== "/app/discover") {
        return navigate(`/app/discover?name=${value}&scroll=true`)
      }

      setSearchParams({ name: value, scroll: "true" })
    },
    1000
  )

  return (
    <Input
      className="w-96 lg:w-72 md:w-60 sm:hidden"
      defaultValue={searchParams.get("name")!}
      magnifierClassName="sm:hidden"
      placeholder="Search for public quizzes"
      withMagnifier
      onChange={debouncedChangeHandler}
    />
  )
}
