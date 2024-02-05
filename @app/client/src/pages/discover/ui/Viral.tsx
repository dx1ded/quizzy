import Skeleton from "react-loading-skeleton"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { QuizType } from "@quizzy/common"
import { useQuery } from "@tanstack/react-query"
import { useSecuredRequest } from "entities/account"
import { Heading } from "shared/ui/Typography"
import { SliderNavNext, SliderNavPrev } from "./SliderNav"
import { QuizCard } from "./QuizCard"

export function Viral() {
  const request = useSecuredRequest()
  const { data, isLoading } = useQuery({
    queryKey: ["viralQuizzes"],
    queryFn: () => request<QuizType[]>("/api/quiz/list/viral?perPage=4&page=1"),
    refetchOnWindowFocus: false,
  })

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
              <SwiperSlide key={quiz.id}>
                <QuizCard cover={quiz.cover} id={quiz.id} />
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </section>
  )
}
