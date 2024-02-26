import { Caption, Subheading } from "shared/ui/Typography"
import { AppHeader } from "widgets/header"
import { Screen } from "widgets/screen"

export function About() {
  return (
    <div className="pt-2">
      <AppHeader />
      <Screen>
        <div className="max-w-3xl">
          <div className="mb-12 lg:mb-8 sm:mb-6">
            <Subheading className="mb-4 lg:mb-2.5 md:mb-1.5">
              About Quizzy
            </Subheading>
            <Caption className="sm:inline-block">
              Welcome to Quizzy, your go-to destination for creating and
              participating in interactive quizzes that make learning engaging
              and enjoyable. At Quizzy, we believe that education should be fun,
              interactive, and accessible to all. Our mission is to
              revolutionize the way people learn by providing a platform where
              anyone can create, share, and participate in quizzes tailored to
              their interests and needs.
            </Caption>
          </div>
          <div className="mb-12 lg:mb-8 sm:mb-6">
            <Subheading className="mb-2.5 lg:mb-4 md:mb-1.5">
              Our Vision
            </Subheading>
            <Caption className="sm:inline-block">
              Our vision at Quizzy is to empower educators, students, and
              lifelong learners to unlock their full potential through
              interactive learning experiences. We strive to create a community
              where knowledge is celebrated, curiosity is nurtured, and learning
              knows no bounds.
            </Caption>
          </div>
          <div className="mb-12 lg:mb-8 sm:mb-6">
            <Subheading className="mb-2.5 lg:mb-4 md:mb-1.5">
              Why Quizzy?
            </Subheading>
            <Caption className="sm:inline-block">
              Quizzy stands out as a versatile and user-friendly platform for
              creating and engaging with quizzes. Whether you're a teacher
              looking to gamify your lessons, a student seeking an interactive
              study tool, or simply someone who loves to challenge themselves
              with quizzes, Quizzy has something for everyone. Here's why Quizzy
              is the ultimate choice for interactive learning:
            </Caption>
            <ol className="mt-4 flex list-inside list-decimal flex-col gap-3">
              <li className="text-sm sm:text-xs">
                <span className="font-bold">Ease of Use:</span> Quizzy's
                intuitive interface makes it easy for anyone to create quizzes
                in minutes, without any prior technical knowledge.
              </li>
              <li className="text-sm sm:text-xs">
                <span className="font-bold">Interactive Gameplay:</span> Engage
                your audience with real-time quizzes that foster excitement,
                competition, and collaboration.
              </li>
              <li className="text-sm sm:text-xs">
                <span className="font-bold">Customization:</span> Tailor quizzes
                to your preferences with customizable options for themes,
                backgrounds, time limits, and scoring systems.
              </li>
              <li className="text-sm sm:text-xs">
                <span className="font-bold">Multi-Device Compatibility:</span>{" "}
                Access Quizzy from any device, anywhere, anytime, ensuring
                seamless participation and accessibility.
              </li>
              <li className="text-sm sm:text-xs">
                <span className="font-bold">Real-Time Feedback:</span> Receive
                instant feedback on answers to track progress and identify areas
                for improvement.
              </li>
              <li className="text-sm sm:text-xs">
                <span className="font-bold">Comprehensive Analytics:</span> Gain
                insights into participant performance with detailed analytics
                and reporting tools.
              </li>
              <li className="text-sm sm:text-xs">
                <span className="font-bold">Educational and Fun:</span> Combine
                educational content with engaging gameplay to make learning
                enjoyable and rewarding for all.
              </li>
            </ol>
          </div>
          <div>
            <Subheading className="mb-2.5 lg:mb-4 md:mb-1.5">
              Get Started with Quizzy
            </Subheading>
            <Caption className="sm:inline-block">
              Ready to embark on a journey of interactive learning with Quizzy?
              Join our community today and unlock a world of knowledge,
              creativity, and fun! Whether you're a teacher, student, or
              lifelong learner, Quizzy has something for everyone. Download the
              app now and start creating and participating in quizzes that
              inspire curiosity, spark imagination, and ignite a passion for
              learning. Welcome to Quizzy—where learning comes alive!
            </Caption>
          </div>
        </div>
      </Screen>
    </div>
  )
}
