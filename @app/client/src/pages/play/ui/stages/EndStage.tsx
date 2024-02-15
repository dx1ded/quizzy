import { ExitToApp } from "shared/icons/ExitToApp"
import { Avatar } from "shared/ui/Avatar"
import { Button } from "shared/ui/Button"
import { Logo } from "shared/ui/Logo"
import { Heading, Text } from "shared/ui/Typography"

export function EndStage() {
  return (
    <div className="absolute flex h-full w-full">
      <div className="flex flex-1 flex-col items-center self-end">
        <img
          alt="Quiz"
          className="absolute left-0 top-0 -z-10 h-full w-full object-cover"
          src="https://firebasestorage.googleapis.com/v0/b/quizzy-222b7.appspot.com/o/quiz-background.png?alt=media"
        />
        <button
          className="absolute left-5 top-5 rounded-lg bg-secondary p-2 shadow"
          type="button">
          <ExitToApp color="#fff" width={1.5} />
        </button>
        <Logo className="mb-4" color="#fff" size={3.5} />
        <div className="mb-10 bg-white px-14 py-2.5 shadow-2xl">
          <Heading>Quiz Name</Heading>
        </div>
        <div className="flex h-[28rem] items-end">
          <div className="h-[65%] w-44 rounded-t-xl bg-primary py-6 shadow-2xl">
            <div className="relative mb-2">
              <svg
                className="mx-auto"
                fill="none"
                height="70"
                viewBox="0 0 77 70"
                width="77"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21.5 2L3 38.5L46 66.5L74 31.5L56.5 2H21.5Z"
                  fill="#94A29C"
                  stroke="#CACACA"
                  strokeWidth="4"
                />
              </svg>
              <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-2/3 text-[1.75rem] font-extrabold text-white">
                2
              </h2>
            </div>
            <Text className="text-center !font-semibold text-white">
              @nickname
            </Text>
            <p className="text-center font-bold text-white">40</p>
          </div>
          <div className="h-full w-44">
            <Avatar
              className="mx-auto mb-2 shadow-xl"
              height="5.5rem"
              name="monkey"
              width="5.5rem"
            />
            <div className="h-full rounded-t-xl bg-primary py-6 shadow-2xl">
              <div className="relative mb-2">
                <svg
                  className="mx-auto"
                  fill="none"
                  height="70"
                  viewBox="0 0 77 70"
                  width="77"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21.5 2L3 38.5L46 66.5L74 31.5L56.5 2H21.5Z"
                    fill="#FFD023"
                    stroke="#CCA100"
                    strokeWidth="4"
                  />
                </svg>
                <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-2/3 text-[1.75rem] font-extrabold text-white">
                  1
                </h2>
              </div>
              <Text className="text-center !font-semibold text-white">
                @nickname
              </Text>
              <p className="text-center font-bold text-white">40</p>
            </div>
          </div>
          <div className="h-[55%] w-44 rounded-t-xl bg-primary py-6 shadow-2xl">
            <div className="relative mb-2">
              <svg
                className="mx-auto"
                fill="none"
                height="70"
                viewBox="0 0 77 70"
                width="77"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21.5 2L3 38.5L46 66.5L74 31.5L56.5 2H21.5Z"
                  fill="#FB6031"
                  stroke="#FF8864"
                  strokeWidth="4"
                />
              </svg>
              <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-2/3 text-[1.75rem] font-extrabold text-white">
                3
              </h2>
            </div>
            <Text className="text-center !font-semibold text-white">
              @nickname
            </Text>
            <p className="text-center font-bold text-white">40</p>
          </div>
        </div>
      </div>
      <div className="basis-56 bg-white px-2.5 py-4">
        <Button className="mb-3 w-full" variant="secondary">
          Podium
        </Button>
        <Button className="w-full" variant="white">
          View summary
        </Button>
      </div>
    </div>
  )
}
