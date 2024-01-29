import Skeleton from "react-loading-skeleton"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { QuizType } from "@quizzy/common"
import { useQuery } from "@tanstack/react-query"
import { useSecuredRequest } from "entities/account"
import { Heading } from "shared/ui/Typography"
import { SliderNavNext, SliderNavPrev } from "./SliderNav"
import { QuizCard } from "./QuizCard"

export function Newest() {
  const request = useSecuredRequest()
  const { data, isLoading } = useQuery({
    queryKey: ["newestQuizzes"],
    queryFn: () => request<QuizType[]>("/api/quiz/list/newest"),
    refetchOnWindowFocus: false,
  })

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
          {isLoading ? (
            <>
              <SwiperSlide>
                <Skeleton height={156} />
              </SwiperSlide>
              <SwiperSlide>
                <Skeleton height={156} />
              </SwiperSlide>
              <SwiperSlide>
                <Skeleton height={156} />
              </SwiperSlide>
              <SwiperSlide>
                <Skeleton height={156} />
              </SwiperSlide>
            </>
          ) : (
            data?.map((quiz) => (
              <SwiperSlide>
                <QuizCard key={quiz.id} cover={quiz.cover} id={quiz.id} />
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </section>
  )
}
