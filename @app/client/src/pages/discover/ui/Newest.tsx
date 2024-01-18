import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { Heading } from "shared/ui/Typography"
import { QuizCard } from "./QuizCard"
import { SliderNavNext, SliderNavPrev } from "./SliderNav"

export function Newest() {
  return (
    <section className="w-full">
      <Heading className="mb-5">Newest</Heading>
      <div className="relative">
        <SliderNavPrev sliderName="newest" />
        <SliderNavNext sliderName="newest" />
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".newest__nav--prev",
            nextEl: ".newest__nav--next",
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
