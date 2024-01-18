import "swiper/css"

import { AppHeader } from "widgets/header"
import { Screen } from "widgets/screen"
import { Box } from "shared/ui/Box"
import { Viral } from "./Viral"
import { Newest } from "./Newest"
import { SearchSection } from "./SearchSection"

export function Discover() {
  return (
    <div className="pt-2">
      <AppHeader />
      <Screen className="flex-col">
        <Box className="flex w-full flex-col gap-12">
          <Viral />
          <Newest />
          <SearchSection />
        </Box>
      </Screen>
    </div>
  )
}
