import { Button } from "shared/ui/Button"
import { ArrowBack } from "shared/icons/ArrowBack"
import { ArrowForward } from "shared/icons/ArrowForward"

interface SliderNavProps {
  sliderName: string
}

export function SliderNavPrev({ sliderName }: SliderNavProps) {
  return (
    <Button
      className={`${sliderName}__nav--prev absolute -left-4 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full shadow-xl`}
      variant="white">
      <ArrowBack width={1.25} />
    </Button>
  )
}

export function SliderNavNext({ sliderName }: SliderNavProps) {
  return (
    <Button
      className={`${sliderName}__nav--next absolute -right-4 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full shadow-xl`}
      variant="white">
      <ArrowForward width={1.25} />
    </Button>
  )
}
