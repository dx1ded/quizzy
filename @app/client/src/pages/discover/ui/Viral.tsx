import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { Heading } from "shared/ui/Typography"
import { QuizCard } from "./QuizCard"
import { SliderNavNext, SliderNavPrev } from "./SliderNav"

export function Viral() {
  return (
    <section className="w-full">
      <Heading className="mb-5">Most Viral</Heading>
      <div className="relative">
        <SliderNavPrev sliderName="viral" />
        <SliderNavNext sliderName="viral" />
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".viral__nav--prev",
            nextEl: ".viral__nav--next",
          }}
          slidesPerView={3}
          spaceBetween={30}
          loop>
          <SwiperSlide>
            <QuizCard />
          </SwiperSlide>
          <SwiperSlide>
            <QuizCard />
          </SwiperSlide>
          <SwiperSlide>
            <QuizCard />
          </SwiperSlide>
          <SwiperSlide>
            <QuizCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  )
}
