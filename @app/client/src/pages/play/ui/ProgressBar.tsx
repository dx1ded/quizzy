interface ProgressBarProps {
  progress: number
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="relative mx-4 mb-14 h-8 rounded-full bg-white shadow-lg lg:mb-8 md:mb-6">
        <div
          className="absolute left-0 top-0 h-8 rounded-full bg-secondary transition-all ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
