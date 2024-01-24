import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Skeleton from "react-loading-skeleton"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { QuizType } from "@quizzy/common"
import { AppStore, AppThunkDispatch } from "entities"
import { AccountState, sendSecuredRequest } from "entities/account"
import { Heading } from "shared/ui/Typography"
import { SliderNavNext, SliderNavPrev } from "./SliderNav"
import { QuizCard } from "./QuizCard"

export function Newest() {
  const { token } = useSelector<AppStore, AccountState>(
    (state) => state.account
  )
  const dispatch = useDispatch<AppThunkDispatch>()
  const [isLoading, setIsLoading] = useState(false)
  const [quizzes, setQuizzes] = useState<QuizType[]>([])

  useEffect(() => {
    setIsLoading(true)
    sendSecuredRequest("/api/quiz/getNewest", dispatch, {
      token,
    }).then((data) => {
      setQuizzes(data)
      setIsLoading(false)
    })
  }, [dispatch, token])

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
            quizzes.map((quiz) => (
              <SwiperSlide>
                <QuizCard key={quiz.id} id={quiz.id} picture={quiz.picture} />
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </section>
  )
}
